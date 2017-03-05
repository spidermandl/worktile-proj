package com.sjtu.worktile.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.*;
import com.sjtu.worktile.msg.*;
import com.sjtu.worktile.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * Created by Desmond on 10/01/2017.
 * 任务相关api操作
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
     * 获取任务信息
     * @param request
     * @return
     */
    @RequestMapping(value = "{task_id}/info/{project_id}", method = RequestMethod.GET)
    @ResponseBody
    public TaskInfoMsg.OutMsg info(final HttpServletRequest request,
                                   @PathVariable long task_id,
                                   @PathVariable long project_id) throws AppException{
        long uid=super.getUserID(request);
        TTask task = taskService.findTaskById(task_id);
        TTask entry = taskService.findTaskById(task.getParentId());
        TaskInfoMsg.OutMsg msg = new TaskInfoMsg.OutMsg();
        mappingToTaskMsg(msg.data,task,entry,uid);
        return msg;
    }

    /**
     * 新增任务
     * @param pid
     * @param entry_id
     * @param names
     * @param members
     * @param is_locked
     * @param expire_date
     * @param labels
     * @param pos_type
     * @param request
     * @return
     * @throws AppException
     */
    @RequestMapping(value="create",method=RequestMethod.POST)
    @ResponseBody
    public TaskNewMsg.OutMsg create(@RequestParam("pid") long pid,
                                      @RequestParam("entry_id") long entry_id,
                                      @RequestParam("names") String names,
                                      @RequestParam(value = "members",required = false) String members,
                                      @RequestParam("is_locked") int is_locked,
                                      @RequestParam(value = "expire_date",required = false) Long expire_date,
                                      @RequestParam(value = "labels",required = false) String labels,
                                      @RequestParam("pos_type") String pos_type,
                                      final HttpServletRequest request)throws AppException{

        long uid=super.getUserID(request);

        TTask tTask=new TTask();
        tTask.setParentId(entry_id);
        tTask.setCreaterId(uid);
        tTask.setLocked(is_locked);
        tTask.setTitle(JSON.parseArray(names).getString(0));
        tTask.setType(Const.TASK_TYPE.TASK);
        tTask.setCreateTime(new Date(System.currentTimeMillis()));
        if (expire_date!=null)
            tTask.setEndTime(new Date(expire_date));
        tTask.setPos(taskService.getHighestPos(entry_id));
        tTask.setCreateTime(new Date());
        String[] ms = JSON.parseArray(members).toArray(new String[0]);
        for (String member_id:ms){
            TTaskAssignment assignment = new TTaskAssignment();
            assignment.setAssignerId(Long.parseLong(member_id));
            taskService.assignTask(assignment);
        }
        taskService.createTask(tTask);

        TaskNewMsg.OutMsg out=new TaskNewMsg.OutMsg();
        mappingToTaskMsg(out.data,tTask,taskService.findTaskById(entry_id),uid);
        return  out;
    }

    /**
     * 获取任务附件信息
     * @param request
     * @return
     */
    @RequestMapping(value = "{task_id}/files/{project_id}", method = RequestMethod.GET)
    @ResponseBody
    public TaskFileMsg.OutMsg files(final HttpServletRequest request,
                                   @PathVariable long task_id,
                                   @PathVariable long project_id) throws AppException{
        long uid=super.getUserID(request);
        List<TTaskAttachment> files = taskService.findFilesByTaskid(task_id);
        TaskFileMsg.OutMsg msg = new TaskFileMsg.OutMsg();
        for (TTaskAttachment attachment: files){
            PairMsg.ResponseMsg.Attach attach = new PairMsg.ResponseMsg.Attach();
            mappingToAttachMsg(attach,attachment,project_id);
            msg.data.add(attach);
        }
        return msg;
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
