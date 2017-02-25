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
    public void createTask(TTask tTask) throws AppException{
         tTaskMapper.insert(tTask);
    }

    /**
     * 获取特点组信息
     * @param parent_id
     */
    public List<TTask> getItemByParentId(long parent_id){
        TTaskExample query=new TTaskExample();
        TTaskExample.Criteria criteria = query.createCriteria();
        criteria.andParentIdEqualTo(parent_id);
        return tTaskMapper.selectByExample(query);
    }

    /**
     * 获取特点组信息
     * @param parent_ids
     */
    public List<TTask> getItemByParentId(Long[] parent_ids){
        TTaskExample query=new TTaskExample();
        for (Long id : parent_ids) {
            TTaskExample.Criteria criteria = query.createCriteria();
            criteria.andParentIdEqualTo(id);
            query.or(criteria);
        }
        return tTaskMapper.selectByExample(query);
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
     * 获取关注者
     * @param task_ids
     * @return
     */
     public List<TTaskAssignment> getFollowers(Long[] task_ids){
         TTaskAssignmentExample query=new TTaskAssignmentExample();
         for (Long id : task_ids){
             TTaskAssignmentExample.Criteria criteria = query.createCriteria();
             criteria.andTaskIdEqualTo(id).andFollowerIdGreaterThan(0L).andFollowerIdIsNotNull();
             query.or(criteria);
         }
         return tTaskAssignmentMapper.selectByExample(query);
     }

    /**
     * 获取任务参与者
     * @param task_ids
     * @return
     */
     public List<TTaskAssignment> getAssigners(Long[] task_ids){
         TTaskAssignmentExample query=new TTaskAssignmentExample();
         for (Long id : task_ids){
             TTaskAssignmentExample.Criteria criteria = query.createCriteria();
             criteria.andTaskIdEqualTo(id).andAssignerIdEqualTo(0L).andAssignerIdIsNotNull();
             query.or(criteria);
         }
         return tTaskAssignmentMapper.selectByExample(query);
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
