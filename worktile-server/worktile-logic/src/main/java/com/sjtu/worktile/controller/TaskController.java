package com.sjtu.worktile.controller;

import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.TTask;
import com.sjtu.worktile.model.TTaskAssignment;
import com.sjtu.worktile.model.TTaskCheckItem;
import com.sjtu.worktile.model.TTaskCheckItemExample;
import com.sjtu.worktile.msg.*;
import com.sjtu.worktile.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;


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

    /**
     * 取消分配任务
     * @param task_assign_id
     * @param request
     * @return
     * @throws AppException
     */
    @RequestMapping(value="cancelassignment",method = RequestMethod.POST)
    @ResponseBody
    public PairMsg.ResponseMsg canelassignment(@RequestParam("task_assign_id") long task_assign_id,
                                        final HttpServletRequest request)throws AppException{
        TaskCancelassignmentMsg.OutMsg out=new TaskCancelassignmentMsg.OutMsg();
        taskService.cancelassignmentTask(task_assign_id);
        return out;
    }

    /**
     * 关注任务
     * @param task_id
     * @param follower_id
     * @param attach_id
     * @param request
     * @return
     * @throws AppException
     */
    @RequestMapping(value="watch",method=RequestMethod.POST)
    @ResponseBody
    public PairMsg.ResponseMsg watch(@RequestParam("task_id") long task_id,
                                      @RequestParam("follower_id") long follower_id,
                                      @RequestParam("attach_id") long attach_id,
                                     final HttpServletRequest request)throws AppException{
        TTaskAssignment tTaskAssignment=new TTaskAssignment();
        tTaskAssignment.setTaskId(task_id);
        tTaskAssignment.setFollowerId(follower_id);
        tTaskAssignment.setAttachId(attach_id);
        TaskWatchMsg.OutMsg out=new TaskWatchMsg.OutMsg();
        taskService.watch(tTaskAssignment);
        return out;
    }

    /**
     * 取消关注任务
     * @param task_assign_id
     * @param request
     * @return
     * @throws AppException
     */
    @RequestMapping(value="cancelwatch",method = RequestMethod.POST)
    @ResponseBody
    public PairMsg.ResponseMsg cancelwatch(@RequestParam("task_assign_id") long task_assign_id,
                                           final HttpServletRequest request)throws AppException{
        TaskCancelWatchMsg.OutMsg out=new TaskCancelWatchMsg.OutMsg();
        taskService.cancelwatch(task_assign_id);
        return out;
    }

    /**
     * 添加检查项
     * @param task_id
     * @param content
     * @param request
     * @return
     * @throws AppException
     */
    @RequestMapping(value = "newtodo",method = RequestMethod.POST)
    @ResponseBody
    public PairMsg.ResponseMsg newtodo(@RequestParam("task_id") long task_id,
                                        @RequestParam("content") String content,
                                        final HttpServletRequest request)throws AppException{
        long uid=super.getUserID(request);
        TTaskCheckItem tTaskCheckItem=new TTaskCheckItem();
        tTaskCheckItem.setTaskId(task_id);
        tTaskCheckItem.setContent(content);
        tTaskCheckItem.setSenderId(uid);
        TaskNewTodoMsg.OutMsg out=new TaskNewTodoMsg.OutMsg();
        taskService.newtodo(tTaskCheckItem);
        return out;
    }

    /**
     * 删除检查项
     * @param task_check_item_id
     * @param request
     * @return
     * @throws AppException
     */
    @RequestMapping(value="deletetodo",method = RequestMethod.POST)
    @ResponseBody
    public PairMsg.ResponseMsg deletetodo(@RequestParam("task_check_item_id") long task_check_item_id,
                                           final HttpServletRequest request)throws AppException{
        TaskDeleteTodoMsg.OutMsg out=new TaskDeleteTodoMsg.OutMsg();
        taskService.deletetodo(task_check_item_id);
        return out;
    }

    /**
     * 修改检查项
     * @param task_check_item_id
     * @param content
     * @param request
     * @return
     * @throws AppException
     */
    @RequestMapping(value="revisetodo",method = RequestMethod.POST)
    @ResponseBody
    public PairMsg.ResponseMsg revisetodo(@RequestParam("task_check_item_id") long task_check_item_id,
                                           @RequestParam("content") String content,
                                           final HttpServletRequest request)throws AppException{

        TTaskCheckItem tTaskCheckItem=taskService.findCheckItemById(task_check_item_id) ;
        tTaskCheckItem.setContent(content);
        TaskReviseTodoMsg.OutMsg out=new TaskReviseTodoMsg.OutMsg();
        taskService.revisetodo(tTaskCheckItem);
        return out;
    }
}
