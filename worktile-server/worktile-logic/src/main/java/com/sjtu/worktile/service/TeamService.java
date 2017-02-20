package com.sjtu.worktile.service;

import com.sjtu.worktile.model.*;
import com.sjtu.worktile.model.mappers.TProjectMapper;
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
    @Autowired
    private TProjectMapper tProjectMapper;

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

    /**
     * 创建team
     * @param team
     */
    public void createTeam(TTeam team){
        tTeamMapper.insert(team);
    }

    /**
     * 获取团队基本信息
     * @param team_id
     * @return
     */
    public TTeam getTeamInfoById(int team_id){
        return tTeamMapper.selectByPrimaryKey(team_id);
    }

    /**
     * 获取用户在团队中的角色
     * @param uid
     * @param team_id
     * @return
     */
    @Deprecated
    public TUserRole getRoleInTeam(int uid,int team_id){
        TUserRoleExample query = new TUserRoleExample();
        TUserRoleExample.Criteria criteria = query.createCriteria();
        criteria.andUserIdEqualTo(uid).andTeamIdEqualTo(team_id);

        List<TUserRole> roles = tUserRoleMapper.selectByExample(query);
        if (roles!=null && roles.size()==1)
            return roles.get(0);
        return null;
    }

    /**
     * 获取团队项目
     * @param team_id
     * @return
     */
    public List<TProject> getTeamProjects(int team_id){
        TProjectExample query = new TProjectExample();
        TProjectExample.Criteria criteria = query.createCriteria();
        criteria.andTeamIdEqualTo(team_id);
        return tProjectMapper.selectByExample(query);
    }
}
