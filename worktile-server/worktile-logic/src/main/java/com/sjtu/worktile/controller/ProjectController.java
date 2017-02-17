package com.sjtu.worktile.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Author: Desmond
 * 项目相关api
 */
@RestController
@RequestMapping("/api/project")
public class ProjectController {

    /**
     * 获取项目列表
     */
    @RequestMapping(value = "list", method = RequestMethod.POST)
    public void all(){

    }
}
