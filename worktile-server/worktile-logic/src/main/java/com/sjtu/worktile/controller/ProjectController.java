package com.sjtu.worktile.controller;

import com.alibaba.fastjson.JSON;
import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.*;
import com.sjtu.worktile.msg.*;
import com.sjtu.worktile.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Author: Desmond
 * 项目相关api
 */
@RestController
@RequestMapping("/api/project")
public class ProjectController extends BaseController{

    @Autowired
    private TemplateService templateService;


    /**
     * 获取项目列表
     */
    @RequestMapping(value = "list", method = RequestMethod.GET)
    @ResponseBody
    public ProjectListMsg.OutMsg list(final HttpServletRequest request) throws AppException {
        long uid=super.getUserID(request);
        List<TProject> projects=projectService.getSelfProject(uid);
        ProjectListMsg.OutMsg outMsg =new ProjectListMsg.OutMsg();
        for(TProject project :projects){
            ProjectListMsg.OutMsg.Project t=new ProjectListMsg.OutMsg.Project();
            mappingToProjectMsg(t,project,uid);
            outMsg.data.add(t);
        }
        return outMsg;
    }

    /**
     * 创建项目
     * @param request
     * @param team_id
     * @param desc
     * @param name
     * @param template_id
     * @param template_type
     * @param visibility
     * @return
     * @throws AppException
     */
    @RequestMapping(value = "create", method = RequestMethod.POST)
    @ResponseBody
    public ProjectNewMsg.OutMsg create(final HttpServletRequest request,
                                       @RequestParam("team_id") long team_id,
                                       @RequestParam("desc") String desc,
                                       @RequestParam("name") String name,
                                       @RequestParam("template_id") int template_id,
                                       @RequestParam("template_type") int template_type,
                                       @RequestParam("visibility") int visibility) throws AppException{
        long uid = super.getUserID(request);
        //team_id == 0 属于个人项目
        if (team_id>0) {
            TTeam team = teamService.getTeamInfoById(team_id);
            if (team == null) {
                throw new AppException(AppException.CATEGORY.TEAM_NOT_EXIST);
            }
        }

        TProject project = new TProject();
        project.setOwnerId(uid);
        project.setTeamId(team_id);
        project.setDescription(desc);
        project.setName(name);
        project.setVisibility(visibility);
        STemplate template = templateService.getTemplateById(template_id);
        projectService.createProject(project,template.getEntries(),uid);

        ProjectNewMsg.OutMsg outMsg = new ProjectNewMsg.OutMsg();
        mappingToProjectMsg(outMsg.data,project,uid);
//        outMsg.data.navs ;
//        outMsg.data.is_notify ;
//        outMsg.data.auto_archiebed;
//        outMsg.data.show_completed;
//        outMsg.data.is_calendar0;

        return outMsg;
    }

    /**
     * 设置 extension
     * @param msg
     */
    private void setExtension(ProjectInfoMsg.OutMsg msg){
        ProjectInfoMsg.OutMsg.Extension ext =
                JSON.parseObject("{\"eid\":\"478f3a4c51824ad23cb50c1c60670c0f\",\"key\":\"task\",\"type\":1,\"pos\":65535,\"join_date\":1487675975106}",
                ProjectInfoMsg.OutMsg.Extension.class);
        msg.data.info.extensions.add(ext);
        ext = JSON.parseObject("{\"eid\":\"a0e7b2a565119c0a7ec3126a16016113\",\"key\":\"event\",\"type\":1,\"pos\":131071,\"join_date\":1487675975106}",
                ProjectInfoMsg.OutMsg.Extension.class);
        msg.data.info.extensions.add(ext);
        ext = JSON.parseObject("{\"eid\":\"8c7dd922ad47494fc02c388e12c00eac\",\"key\":\"file\",\"type\":1,\"pos\":196606,\"join_date\":1487675975105}",
                ProjectInfoMsg.OutMsg.Extension.class);
        msg.data.info.extensions.add(ext);
        ext = JSON.parseObject("{\"eid\":\"42b90196b487c54069097a68fe98ab6f\",\"key\":\"post\",\"type\":1,\"pos\":262141,\"join_date\":1487675975105}",
                ProjectInfoMsg.OutMsg.Extension.class);
        msg.data.info.extensions.add(ext);
        ext = JSON.parseObject("{\"eid\":\"71860c77c6745379b0d44304d66b6a13\",\"key\":\"page\",\"type\":1,\"pos\":327676,\"join_date\":1487675975105}",
                ProjectInfoMsg.OutMsg.Extension.class);
        msg.data.info.extensions.add(ext);
        ext = JSON.parseObject("{\"eid\":\"f8b0b924ebd7046dbfa85a856e4682c8\",\"key\":\"graph\",\"type\":1,\"pos\":393211,\"join_date\":1487675975104}",
                ProjectInfoMsg.OutMsg.Extension.class);
        msg.data.info.extensions.add(ext);
        ext = JSON.parseObject("{\"eid\":\"c6c45e4495a68b6d99b5ae9afd78ad03\",\"key\":\"show_task_number\",\"type\":2,\"pos\":65535,\"join_date\":1487675975104}",
                ProjectInfoMsg.OutMsg.Extension.class);
        msg.data.info.extensions.add(ext);

    }

    /**
     * 获取项目主要信息
     * @param request
     * @return
     */
    @RequestMapping(value = "{project_id}/info", method = RequestMethod.GET)
    @ResponseBody
    public ProjectInfoMsg.OutMsg info(final HttpServletRequest request,@PathVariable long project_id) throws AppException{
        long uid = super.getUserID(request);
        TProject tProject = projectService.getProjectById(project_id);
        ProjectInfoMsg.OutMsg msg = new ProjectInfoMsg.OutMsg();
        mappingToProjectMsg(msg.data.info,tProject,uid);
//        msg.data.info.navs = null;
//        msg.data.info.is_notify = 1;
//        msg.data.info.auto_archiebed = 0;
//        msg.data.info.show_completed = 0;
//        msg.data.info.is_calendar = 0;
//        msg.data.info.link_join_code = null;
//        msg.data.info.show_background =0;
//        msg.data.info.background =null;
//        msg.data.info.bg_image = null;
//        msg.data.info.extensions
        setExtension(msg);
//        msg.data.info.labels
        teamService.getTeamInfoById(tProject.getTeamId());
        mappingToTeamMsg(msg.data.info.team,
                teamService.getTeamInfoById(tProject.getTeamId()),
                uid);//所属团队
        mappingToUserMsg(msg.data.info.owner,userService.findUserByID(uid));//任务创建者
        /**
         * 整理项目中的用户
         */
        List<TUserRole> roles = projectService.getRolesInProject(tProject.getId());
        Long[] user_ids = new Long[roles.size()];
        Map<Long,TUserRole> id_roles= new HashMap<>();
        //获取用户ids
        int index = 0;
        for (TUserRole role : roles){
            user_ids[index] = role.getUserId();
            id_roles.put(role.getUserId(),role);
            index++;
        }
        List<TUser> users = userService.findUsersByID(user_ids);
        for (TUser user : users){
            PairMsg.ResponseMsg.User u = new PairMsg.ResponseMsg.User();
            mappingToUserMsg(u,user);
            msg.data.members.add(u);//记录任务member
            int roleId = id_roles.get(user.getId()).getRoleId();
            if (roleService.getRolePermissions(roleId).get(0).getMode()== Const.USER_PERMISSIOIN.ADMIN){
                msg.data.info.admins.add(u);//记录任务管理者
            }
        }
        //msg.data.info.is_favorite = 0;
        //msg.data.info.star_pos = 196606;
        return msg;
    }

    @RequestMapping(value = "{project_id}/tasks", method = RequestMethod.GET)
    @ResponseBody
    public ProjectTasksMsg.OutMsg tasks(final HttpServletRequest request,@PathVariable long project_id) throws AppException{
        long uid = super.getUserID(request);
        ProjectTasksMsg.OutMsg msg = new ProjectTasksMsg.OutMsg();
        /**
         * 取出entry
         */
        List<TTask> entries = taskService.getItemByParentId(project_id);
        Map<Long,TTask> entry_map = new HashMap<>();
        for (TTask entry:entries) {
            PairMsg.ResponseMsg.Entry e = new PairMsg.ResponseMsg.Entry();
            mappingToEntryMsg(e,entry);
            msg.data.entries.add(e);

            entry_map.put(entry.getId(),entry);
        }
        /**
         * 取出tasks
         */
        List<TTask> tasks = taskService.getItemByParentId(entry_map.keySet().toArray(new Long[]{}));
        for (TTask task:tasks){
            PairMsg.ResponseMsg.Task t = new PairMsg.ResponseMsg.Task();
            mappingToTaskMsg(t,task,entry_map.get(task.getParentId()),uid);
            msg.data.tasks.add(t);
        }
        return msg;
    }
}
