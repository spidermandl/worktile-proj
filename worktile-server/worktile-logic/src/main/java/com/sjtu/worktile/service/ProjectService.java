package com.sjtu.worktile.service;

import com.sjtu.worktile.model.TProject;
import com.sjtu.worktile.model.TProjectExample;
import com.sjtu.worktile.model.mappers.TProjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Desmond on 17/02/2017.
 */
@Service
public class ProjectService {

    @Autowired
    private TProjectMapper tProjectMapper;

    public List<TProject> getSelfProject(int uid){
        TProjectExample query = new TProjectExample();
        query.or().andOwnerIdEqualTo(uid);

        return tProjectMapper.selectByExample(query);

    }
}
