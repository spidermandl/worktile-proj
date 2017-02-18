package com.sjtu.worktile.controller;

import com.sjtu.worktile.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

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
    @RequestMapping(value = "all", method = RequestMethod.GET)
    public void all(final HttpServletRequest request){
        int uid = super.getUserID(request);
        projectService.getSelfProject(uid);

    }
}
