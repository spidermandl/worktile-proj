package com.sjtu.worktile.service;

import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.TTask;
import com.sjtu.worktile.model.TTaskExample;
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
}
