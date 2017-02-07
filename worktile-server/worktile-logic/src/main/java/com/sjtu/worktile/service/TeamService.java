package com.sjtu.worktile.service;

import com.sjtu.worktile.model.TTeam;
import com.sjtu.worktile.model.TTeamExample;
import com.sjtu.worktile.model.TUserRole;
import com.sjtu.worktile.model.TUserRoleExample;
import com.sjtu.worktile.model.mappers.TTeamMapper;
import com.sjtu.worktile.model.mappers.TUserRoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Desmond on 07/02/2017.
 */
@Service
public class TeamService {

    @Autowired
    private TTeamMapper tTeamMapper;
    @Autowired
    private TUserRoleMapper tUserRoleMapper;

    /**
     * 获取用户所在的组
     * @param uid
     * @return
     */
    public List<TTeam> getSelfTeam(int uid){
        TTeamExample query = new TTeamExample();
        query.or().andCreaterIdEqualTo(uid);

        return tTeamMapper.selectByExample(query);
    }

    /**
     * 获取组中成员数
     * @param tid
     * @return
     */
    public int getTeamCount(int tid){
        TUserRoleExample query = new TUserRoleExample();
        query.or().andTeamIdEqualTo(tid);
        List<TUserRole> users = tUserRoleMapper.selectByExample(query);

        if (users == null)
            return 0;
        return users.size();
    }
}
