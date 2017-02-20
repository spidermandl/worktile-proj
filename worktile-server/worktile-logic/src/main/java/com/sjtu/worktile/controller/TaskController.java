package com.sjtu.worktile.controller;

import com.sjtu.worktile.msg.TaskListMsg;
import com.sjtu.worktile.msg.TeamListMsg;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Desmond on 10/01/2017.
 */
@RestController
@RequestMapping("/api/task")
public class TaskController extends BaseController {

    /**
     * 获取用户未完成的任务
     * @param request
     * @return
     */
    @RequestMapping(value = "uncompleted", method = RequestMethod.GET)
    @ResponseBody
    public TaskListMsg.OutMsg list(final HttpServletRequest request){
        int uid=super.getUserID(request);
        TaskListMsg.OutMsg msg = new TaskListMsg.OutMsg();
        return msg;
    }
}
