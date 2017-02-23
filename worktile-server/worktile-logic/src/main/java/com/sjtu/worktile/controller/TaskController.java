package com.sjtu.worktile.controller;

import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.TTask;
import com.sjtu.worktile.model.TTaskAssignment;
import com.sjtu.worktile.msg.*;
import com.sjtu.worktile.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

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
    public TaskListMsg.OutMsg list(final HttpServletRequest request) throws AppException{
        long uid=super.getUserID(request);
        TaskListMsg.OutMsg msg = new TaskListMsg.OutMsg();
        return msg;
    }


    /**
     * 新增任务
     * @param parent_id
     * @param entry_id
     * @param title
     * @param type
     * @param request
     * @return
     * @throws AppException
     */
    @RequestMapping(value="create",method=RequestMethod.POST)
    @ResponseBody
    public PairMsg.ResponseMsg create(@RequestParam("parent_id") long parent_id,
                                      @RequestParam("entry_id") long entry_id,
                                      @RequestParam("title") String title,
                                      @RequestParam("type") int type,
                                      final HttpServletRequest request)throws AppException{
        long uid=super.getUserID(request);
        TTask tTask=new TTask();
        tTask.setParentId(parent_id);
        tTask.setCreaterId(uid);
        tTask.setParentId(entry_id);
        tTask.setTitle(title);
        tTask.setType(type);
        tTask.setCreateTime(new Date(System.currentTimeMillis()));
        TaskNewMsg.OutMsg out=new TaskNewMsg.OutMsg();
        taskService.createTask(tTask);
        return  out;
    }

    /**
     * 修改任务
     * @param task_id
     * @param desc
     * @param title
     * @param request
     * @return
     * @throws AppException
     */
    @RequestMapping(value = "revise",method = RequestMethod.POST)
    @ResponseBody
    public PairMsg.ResponseMsg revise(@RequestParam("task_id") long task_id,
                                      @RequestParam("desc") String desc,
                                      @RequestParam("title") String title,
                                      final  HttpServletRequest request)throws AppException{
       // long uid=super.getUserID(request);
        TTask tTask=taskService.findTaskById(task_id);
        tTask.setTitle(title);
        tTask.setDescription(desc);
        tTask.setUpdateTime(new Date(System.currentTimeMillis()));
        TaskReviseMsg.OutMsg out=new TaskReviseMsg.OutMsg();
        taskService.reviseTask(tTask);
        return out;
    }

    /**
     * 分配任务
     * @param task_id
     * @param assigner_id
     * @param request
     * @param attach_id
     * @return
     * @throws AppException
     */
    @RequestMapping(value="assign",method = RequestMethod.POST)
    @ResponseBody
    public PairMsg.ResponseMsg assign(@RequestParam("task_id") long task_id,
                                           @RequestParam("assigner_id") long assigner_id,
                                           @RequestParam("attach_id") long attach_id,
                                           final HttpServletRequest request)throws AppException{
        TTaskAssignment tTaskAssignment=new TTaskAssignment();
        tTaskAssignment.setAssignerId(assigner_id);
        tTaskAssignment.setTaskId(task_id);
        tTaskAssignment.setAttachId(attach_id);
        TaskAssignMsg.OutMsg out=new TaskAssignMsg.OutMsg();
        taskService.assignTask(tTaskAssignment);
        return out;
    }

    @RequestMapping(value="cancelassignment",method = RequestMethod.POST)
    @ResponseBody
    public PairMsg.ResponseMsg canelassignment(@RequestParam("task_assign_id") long task_assign_id,
                                        final HttpServletRequest request)throws AppException{
        TaskCancelassignmentMsg.OutMsg out=new TaskCancelassignmentMsg.OutMsg();
        taskService.cancelassignmentTask(task_assign_id);
        return out;
    }
}
