package com.sjtu.worktile.controller;

import com.sjtu.worktile.msg.PairMsg;
import com.sjtu.worktile.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Desmond on 06/02/2017.
 */
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;


    public PairMsg.ResponseMsg taskList(){
        return null;
    }
}
