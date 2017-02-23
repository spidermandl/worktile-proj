package com.sjtu.worktile.service;


import com.sjtu.worktile.model.*;
import com.sjtu.worktile.model.mappers.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Created by lenovo on 2017/2/17.
 */
@Service
public class ProjectService {
    @Autowired
    private TProjectMapper tProjectMapper;

    /**
     * 获取用户所有项目信息
     * @param uid
     * @return
     */
    public List<TProject> getSelfProject(long uid){
        TProjectExample query=new TProjectExample();
        query.or().andOwnerIdEqualTo(uid);
        return tProjectMapper.selectByExample(query);
    }

    /**
     * 获取团队中项目数量
     * @param team_id
     * @return
     */
    public long getCountByTeam(long team_id){
        TProjectExample query=new TProjectExample();
        TProjectExample.Criteria criteria = query.createCriteria();
        criteria.andTeamIdEqualTo(team_id);

        return tProjectMapper.countByExample(query);
    }
}
