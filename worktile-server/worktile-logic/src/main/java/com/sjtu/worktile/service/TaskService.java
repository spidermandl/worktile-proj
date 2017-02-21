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
 */
@Service
public class TaskService {
    @Autowired
    private TTaskMapper tTaskMapper;

    public void insertTask(TTask tTask)throws AppException{
        tTaskMapper.insert(tTask);
    }
}
