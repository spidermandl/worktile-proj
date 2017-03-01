package com.sjtu.worktile.service;

import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.model.*;
import com.sjtu.worktile.model.mappers.TProjectMapper;
import com.sjtu.worktile.model.mappers.TTeamMapper;
import com.sjtu.worktile.model.mappers.TUserMapper;
import com.sjtu.worktile.model.mappers.TUserRoleMapper;
import com.sjtu.worktile.msg.PairMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    public List<TTeam> getSelfTeam(long uid){
        TTeamExample query = new TTeamExample();
        query.or().andCreaterIdEqualTo(uid);
        return tTeamMapper.selectByExample(query);
    }

    /**
     * 获取组中成员数
     * @param tid
     * @return
     */
    public long getTeamCount(long tid){
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
    public List<TUser> getAllTeamContacts(long uid){
        /**
         * 根据teamid查找userrole
         */
        List<TTeam> teams = getSelfTeam(uid);
        TUserRoleExample query = new TUserRoleExample();
        if (teams.size()==0){//没有team
            return new ArrayList<TUser>();
        }
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
            long id = r.getUserId();
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
     * @param uid
     */
    public void createTeam(TTeam team,long uid){
        tTeamMapper.insert(team);
        /**
         * 插入创建者管理员角色
         */
        TUserRole role = new TUserRole();
        role.setUserId(uid);
        role.setTeamId(team.getId());
        role.setRoleId(Const.USER_ROLE.TEAM_ADMIN);
        tUserRoleMapper.insert(role);
    }

    /**
     * 获取团队基本信息
     * @param team_id
     * @return
     */
    public TTeam getTeamInfoById(long team_id){
        return tTeamMapper.selectByPrimaryKey(team_id);
    }

    /**
     * 获取用户在团队中的角色
     * @param uid
     * @param team_id
     * @return
     */
    public TUserRole getRoleInTeam(long uid,long team_id){
        TUserRoleExample query = new TUserRoleExample();
        TUserRoleExample.Criteria criteria = query.createCriteria();
        criteria.andUserIdEqualTo(uid).andTeamIdEqualTo(team_id);

        List<TUserRole> roles = tUserRoleMapper.selectByExample(query);
        if (roles!=null && roles.size()==1)
            return roles.get(0);
        return null;
    }

    /**
     * 获取团队项目 联合查询优化
     * @param team_id
     * @param uid
     * @return
     */
    public List<TProject> getTeamProjects(long team_id,long uid){
        /**
         * 查出所有team中的project
         */
        TProjectExample query = new TProjectExample();
        TProjectExample.Criteria criteria = query.createCriteria();
        criteria.andTeamIdEqualTo(team_id);
        List<TProject> full = tProjectMapper.selectByExample(query);
        /**
         * 过滤出该用户有访问权限的项目
         */
        List<TProject> result = new ArrayList<>();
        TUserRoleExample roleQuery = new TUserRoleExample();
        for (TProject p:full){
            TUserRoleExample.Criteria roleCriteria = roleQuery.createCriteria();
            roleCriteria.andProjectIdEqualTo(p.getId()).andUserIdEqualTo(uid);
            roleQuery.or(roleCriteria);
        }
        List<TUserRole> roles = tUserRoleMapper.selectByExample(roleQuery);
        for (TProject p:full){
            for (TUserRole r : roles){
                if(r.getProjectId() == p.getId()){
                    result.add(p);
                    break;
                }
            }
        }

        return result;

    }

    /**
     * 删除团队，以及团队相关数据
     * @param team_id
     */
    @Transactional
    public void diableTeam(long team_id){
        /**
         * 删除team中的用户
         */
        TUserRoleExample roleQuery = new TUserRoleExample();
        TUserRoleExample.Criteria roleCriteria = roleQuery.createCriteria();
        roleCriteria.andTeamIdEqualTo(team_id);
        tUserRoleMapper.deleteByExample(roleQuery);

        /**
         * 删除team中的项目
         */
        TProjectExample projectQuery = new TProjectExample();
        TProjectExample.Criteria proCriteria = projectQuery.createCriteria();
        proCriteria.andTeamIdEqualTo(team_id);
        tProjectMapper.deleteByExample(projectQuery);

    }
}
