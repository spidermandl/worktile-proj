package com.sjtu.worktile.controller;

import com.alibaba.fastjson.JSON;
import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.*;
import com.sjtu.worktile.msg.PairMsg;
import com.sjtu.worktile.msg.ProjectListMsg;
import com.sjtu.worktile.msg.ProjectNewMsg;
import com.sjtu.worktile.msg.TeamTemplatesMsg;
import com.sjtu.worktile.service.ProjectService;
import com.sjtu.worktile.service.RoleService;
import com.sjtu.worktile.service.TeamService;
import com.sjtu.worktile.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;


/**
 * Author: Desmond
 * 项目相关api
 */
@RestController
@RequestMapping("/api/project")
public class ProjectController extends BaseController{

    @Autowired
    private TeamService teamService;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private TemplateService templateService;
    @Autowired
    private RoleService roleService;

    /**
     * 将 project 的内容赋给 t
     * @param p
     * @param project
     */
    protected void mappingToProjectMsg(PairMsg.ResponseMsg.Project p, TProject project,long uid){
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
        p.curr_role = role==null? Const.USER_ROLE.GUEST:role.getRoleId();//当前用户角色: 1:管理员，2:成员，3:访客，4:来宾,公开项目可以访问
        SPermission permission = role==null?null:roleService.getRolePermissions(role.getRoleId()).get(0);
        p.permission = permission == null? Const.USER_PERMISSIOIN.GUEST:permission.getMode();//当前用户权限: 31:管理员，15:成员，7:访客，5:来宾，0:无法操作
    }

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

}
