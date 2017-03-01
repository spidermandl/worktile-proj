package com.sjtu.worktile.controller;

import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.*;
import com.sjtu.worktile.msg.ErrorMsg;
import com.sjtu.worktile.msg.PairMsg;
import com.sjtu.worktile.service.*;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Desmond on 07/02/2017.
 */
abstract public class BaseController {

    @Autowired
    protected UserService userService;
    @Autowired
    protected TeamService teamService;
    @Autowired
    protected RoleService roleService;
    @Autowired
    protected ProjectService projectService;
    @Autowired
    protected TaskService taskService;

    /**
     * 获取token中的userid
     * @param request
     * @return
     */
    protected long getUserID(final HttpServletRequest request) throws AppException{
        final Claims claims = (Claims) request.getAttribute("claims");
        try {
            long id = Long.parseLong(claims.get(Const.TOKEN_UID).toString());
            return id;
        }catch (Exception e){
            throw new AppException(AppException.CATEGORY.TOKEN_PARSE_FAILURE);
        }
    }

    /**
     * 统一处理AppException
     * @param req
     * @param e
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value = AppException.class)
    @ResponseBody
    public ErrorMsg.OutMsg appErrorHandler(HttpServletRequest req, AppException e) throws Exception {
        ErrorMsg.OutMsg msg = new ErrorMsg.OutMsg();
        msg.error_code = e.getErrorCode();
        return msg;
    }

    /**
     * 将tUser的内容赋给rUser
     * @param rUser
     * @param tUser
     */
    protected void mappingToUserMsg(PairMsg.ResponseMsg.User rUser, TUser tUser){
        rUser.uid = tUser.getId();
        rUser.name = tUser.getAccount();
        rUser.email = tUser.getEmail();
        rUser.display_name = tUser.getSignature()==null?tUser.getAccount():tUser.getSignature();
        rUser.avatar = tUser.getHead();//用户头像
        //rUser.desc ;
        //rUser.status ;//用户状态：1：正常，2：邀请，3：需要邮件确认
        //rUser.phone_prefix ;
        rUser.phone = tUser.getPhone();
        //t.owner.title = ;
        rUser.department = tUser.getDepartment();
    }

    /**
     * 将 team 的内容赋给 team消息
     * @param t
     * @param team
     * @param uid
     */
    protected void mappingToTeamMsg(PairMsg.ResponseMsg.Team t, TTeam team, long uid){
        t.team_id = team.getId();
        //t.url      //团队url
        t.name = team.getName();
        t.pic = team.getLogo();//logo
        t.desc = team.getDescription();//team 描述
        //t.status
        //t.edition
        t.create_date = team.getCreateTime().getTime();
        t.visibility =team.getPublicity();//团队类型， 1:私有,2:公开
        t.industry = team.getIndustry();
        //t.default_labels     //默认pids
        //t.default_labels      //默认标签
        //t.template_id        //模板id
        //t.phone              //团队phone
        //t.link_join_code
        //t.is_dingteam         //是否为dingding 项目
        TUserRole role =teamService.getRoleInTeam(uid,team.getId());
        t.curr_role = role==null? Const.USER_ROLE.TEAM_GUEST:role.getRoleId();//当前用户角色: 1:管理员，2:成员，3:访客，4:来宾,公开项目可以访问
        t.is_owner = team.getCreaterId() == uid?1:0;//是否为创建者
        t.member_count = teamService.getTeamCount(team.getId());//成员数量
        SPermission permission = role==null?null:roleService.getRolePermissions(role.getRoleId()).get(0);
        t.permission = permission == null? Const.USER_PERMISSIOIN.GUEST:permission.getMode();//当前用户权限: 31:管理员，15:成员，7:访客，5:来宾，0:无法操作
        t.project_count = projectService.getCountByTeam(team.getId());//团队中项目数量
    }

    /**
     * 将 project 的内容赋给 project消息
     * @param p
     * @param project
     */
    protected void mappingToProjectMsg(PairMsg.ResponseMsg.Project p, TProject project, long uid){
        p.pid = project.getId();
        p.name = project.getName();
        p.team_id = project.getTeamId();
        p.desc =project.getDescription();
        //p.archived ;//是否存档，0：未存档，1：已存档
        //p.pic ;
        //p.bg ;
        p.visibility = project.getVisibility();
        //p.is_star ;//是否常用项目，0：非常用项目，1：常用项目
        //p.pos ;
        p.member_count= projectService.getProjectMemberCount(project.getId());
        TUserRole role =projectService.getRoleInProject(uid,project.getId());
        p.curr_role = role==null||role.getRoleId() != Const.USER_ROLE.PROJECT_ADMIN? 2:1;//当前用户角色: 1:管理员，2:成员,访客
        SPermission permission = role==null?null:roleService.getRolePermissions(role.getRoleId()).get(0);
        p.permission = permission == null? Const.USER_PERMISSIOIN.GUEST:permission.getMode();//当前用户权限: 31:管理员，15:成员，7:访客，5:来宾，0:无法操作
    }

    /**
     * 将 task 的内容赋给 entry消息
     * @param e
     * @param task
     */
    protected void mappingToEntryMsg(PairMsg.ResponseMsg.Entry e,TTask task){
        e.entry_id = task.getId();
        e.name = task.getTitle();
        e.pos =task.getPos();
        //e.archived = ;
        e.create_date = task.getCreateTime().getTime();
        e.update_date = task.getUpdateTime()==null?0:task.getUpdateTime().getTime();
        e.watched = false;
    }

    /**
     * 将 task 的内容赋给 task消息
     * @param t
     * @param task
     */
    protected void mappingToTaskMsg(PairMsg.ResponseMsg.Task t,TTask task,TTask entry,long uid){
        t.tid = task.getId();//任务id
        t.entry_id = task.getParentId();//任务组id
        t.pid = entry.getParentId();//项目id
        t.name = task.getTitle();//任务名称
        t.desc = task.getDescription();//描述
        t.pos = task.getPos();//位置
        //t.labels = ;//标签
        t.uid = uid;//用户id
        t.expire_date = task.getEndTime()==null?0:task.getEndTime().getTime();//任务截止日期
        //t.completed = ;//是否完成：0：未完成，1：已完成
        /**
         * 获取分配的成员
         */
        Long[] task_ids = {task.getId()};
        List<TTaskAssignment> assignments = taskService.getAssigners(task_ids);
        Long[] user_ids = new Long[assignments.size()];
        for (int i =0 ;i< user_ids.length;i++){
            user_ids[i] = assignments.get(i).getAssignerId();
        }
        List<TUser> users = userService.findUsersByID(user_ids);
        for (TUser u:users){
            PairMsg.ResponseMsg.User user = new PairMsg.ResponseMsg.User();
            mappingToUserMsg(user,u);
            t.members.add(user);
        }
        //t.badges = ;//附加信息
        //t.todos = ;//检查项
        //t.is_deleted = ;//是否删除
        t.is_locked = 0;//是否锁定
        t.is_loop = 0;
        t.archived = 0;
        t.created_at = task.getCreateTime().getTime();
        t.updated_at = task.getUpdateTime()==null?0:task.getUpdateTime().getTime();
        //t.completed_date = ;//完成日期
        //t.fids =;
        t.entry_name = entry.getTitle();//任务组名称
        /**
         * 获取关注的成员
         */
        assignments = taskService.getFollowers(task_ids);
        user_ids = new Long[assignments.size()];
        for (int i =0 ;i< user_ids.length;i++){
            user_ids[i] = assignments.get(i).getFollowerId();
        }
        users = userService.findUsersByID(user_ids);
        for (TUser u:users){
            PairMsg.ResponseMsg.User user = new PairMsg.ResponseMsg.User();
            mappingToUserMsg(user,u);
            t.watchers.add(user);
        }

    }
}
