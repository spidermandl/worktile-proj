package com.sjtu.worktile.service;

import com.sjtu.worktile.model.*;
import com.sjtu.worktile.model.mappers.TTeamMapper;
import com.sjtu.worktile.model.mappers.TUserMapper;
import com.sjtu.worktile.model.mappers.TUserRoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
    @Autowired
    private TUserMapper tUserMapper;

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
    public long getTeamCount(int tid){
        TUserRoleExample query = new TUserRoleExample();
        query.or().andTeamIdEqualTo(tid);
        return tUserRoleMapper.countByExample(query);
    }

    /**
     * 获取所有团队中的相关人员
     * 需要做联合查询
     * @param uid
     * @return
     */
    public List<TUser> getAllTeamContacts(int uid){
        /**
         * 根据teamid查找userrole
         */
        List<TTeam> teams = getSelfTeam(uid);
        TUserRoleExample query = new TUserRoleExample();
        for (TTeam t:teams) {
            TUserRoleExample.Criteria criteria = query.createCriteria();
            criteria.andTeamIdEqualTo(t.getId());
            criteria.andUserIdNotEqualTo(uid);//除去自己
            query.or(criteria);
        }
        List<TUserRole> roles = tUserRoleMapper.selectByExample(query);
        /**
         * 根据userrole表查找用户
         */
        HashMap<Long,Boolean> uids = new HashMap<>();
        TUserExample uQuery = new TUserExample();
        for (TUserRole r : roles){//除去相同的人
            int id = r.getUserId();
            if (!uids.containsKey(id)){
                TUserExample.Criteria criteria = uQuery.createCriteria();
                criteria.andIdEqualTo(id);
                uQuery.or(criteria);
            }
        }
        return tUserMapper.selectByExample(uQuery);
    }
}
