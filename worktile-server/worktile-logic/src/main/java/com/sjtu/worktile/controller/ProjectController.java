package com.sjtu.worktile.controller;

import com.sjtu.worktile.model.TProject;
import com.sjtu.worktile.msg.ProjectListMsg;
import com.sjtu.worktile.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
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
    private ProjectService projectService;
    /**
     * 获取项目列表
     */

    @RequestMapping(value = "list", method = RequestMethod.GET)
    @ResponseBody
    public ProjectListMsg.OutMsg list(final HttpServletRequest request){
        int uid=super.getUserID(request);
        List<TProject> projects=projectService.getSelfProject(uid);
        ProjectListMsg.OutMsg outMsg =new ProjectListMsg.OutMsg();
        for(TProject project :projects){
            ProjectListMsg.OutMsg.Project t=new ProjectListMsg.OutMsg.Project();
            t.project_id=project.getId();
            t.name=project.getName();
            t.crew_cap=project.getCrewCap();
            t.description=project.getDescription();
            outMsg.data.add(t);
        }
        return outMsg;

    }
}
