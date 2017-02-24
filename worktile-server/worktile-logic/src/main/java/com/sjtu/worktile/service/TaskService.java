package com.sjtu.worktile.service;

import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.*;
import com.sjtu.worktile.model.mappers.TTaskAssignmentMapper;
import com.sjtu.worktile.model.mappers.TTaskCheckItemMapper;
import com.sjtu.worktile.model.mappers.TTaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lenovo on 2017/2/21.
 * 任务service
 */
@Service
public class TaskService {
    @Autowired
    private TTaskMapper tTaskMapper;

    @Autowired
    private TTaskAssignmentMapper tTaskAssignmentMapper;

    @Autowired
    private TTaskCheckItemMapper tTaskCheckItemMapper;

    /**
     * 创建任务
     * @param tTask
     * @throws AppException
     */
    public void createTask(TTask tTask)throws AppException{
         tTaskMapper.insert(tTask);
    }

    /**
     * 根据id获取任务
     * @param id
     * @return
     */
     public TTask findTaskById(long id){
         return tTaskMapper.selectByPrimaryKey(id);
     }

    /**
     * 修改任务
     * @param tTask
     * @throws AppException
     */
    public void reviseTask(TTask tTask)throws AppException{
        TTaskExample query=new TTaskExample();
        query.or().andIdEqualTo(tTask.getId());
        tTaskMapper.updateByExample(tTask,query);
    }

    /**
     * 分配任务
     * @param tTaskAssignment
     * @throws AppException
     */
    public void assignTask(TTaskAssignment tTaskAssignment)throws AppException{
        tTaskAssignmentMapper.insert(tTaskAssignment);
    }

    /**
     * 取消分配任务
     * @param task_assign_id
     * @throws AppException
     */
    public void cancelassignmentTask(long task_assign_id)throws AppException{
        tTaskAssignmentMapper.deleteByPrimaryKey(task_assign_id);
    }

    /**
     * 关注任务
     * @param tTaskAssignment
     * @throws AppException
     */
    public void watch(TTaskAssignment tTaskAssignment)throws AppException{
        tTaskAssignmentMapper.insert(tTaskAssignment);
    }

    /**
     * 取消关注任务
     * @param task_assign_id
     * @throws AppException
     */
    public void cancelwatch(long task_assign_id)throws AppException{
        tTaskAssignmentMapper.deleteByPrimaryKey(task_assign_id);
    }

    /**
     * 添加检查项
     * @param tTaskCheckItem
     * @throws AppException
     */
    public void newtodo(TTaskCheckItem tTaskCheckItem)throws AppException{
        tTaskCheckItemMapper.insert(tTaskCheckItem);
    }
}
