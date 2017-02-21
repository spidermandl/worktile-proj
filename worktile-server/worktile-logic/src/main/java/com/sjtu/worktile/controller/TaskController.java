package com.sjtu.worktile.controller;

import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.TTask;
import com.sjtu.worktile.msg.PairMsg;
import com.sjtu.worktile.msg.TaskInsertMsg;
import com.sjtu.worktile.msg.TaskListMsg;
import com.sjtu.worktile.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

/**
 * Created by Desmond on 10/01/2017.
 */
@RestController
@RequestMapping("/api/task")
public class TaskController extends BaseController {
    @Autowired
    private TaskService taskService;

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

    
    /**
     * 新增任务
     * @param request
     * @return
     */
    @RequestMapping(value="insert",method=RequestMethod.POST)
    @ResponseBody
    public PairMsg.ResponseMsg insert(@RequestBody final TaskInsertMsg.InMsg body,
                                      final HttpServletRequest request, final HttpServletResponse response)throws AppException{
        int uid=super.getUserID(request);
        TTask tTask=new TTask();
        tTask.setCreaterId(uid);
        tTask.setParentId(body.entry_id);
        tTask.setTitle(body.title);
        tTask.setCreateTime(new Date(System.currentTimeMillis()));
        TaskInsertMsg.OutMsg out=new TaskInsertMsg.OutMsg();
        taskService.insertTask(tTask);
        return  out;
    }
}
