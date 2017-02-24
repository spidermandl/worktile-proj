package com.sjtu.worktile.service;


import com.alibaba.fastjson.JSON;
import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.model.*;
import com.sjtu.worktile.model.mappers.*;
import com.sjtu.worktile.msg.TeamTemplatesMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by lenovo on 2017/2/17.
 */
@Service
public class ProjectService {
    @Autowired
    private TProjectMapper tProjectMapper;
    @Autowired
    private TTaskMapper tTaskMapper;
    @Autowired
    private TUserRoleMapper tUserRoleMapper;

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


    /**
     * 创建项目
     * @param project
     * @param entries
     * @param uid
     */
    public void createProject(TProject project,String entries,long uid){
        /**
         * 插入project项
         */
        project.setCreateTime(new Date());
        tProjectMapper.insert(project);
        /**
         * 插入创建者管理员角色
         */
        TUserRole role = new TUserRole();
        role.setUserId(uid);
        role.setProjectId(project.getId());
        role.setRoleId(Const.USER_ROLE.ADMIN);
        tUserRoleMapper.insert(role);

        /**
         * 创建对应entries
         */
        List<TeamTemplatesMsg.OutMsg.Entry> es = JSON.parseArray(entries,TeamTemplatesMsg.OutMsg.Entry.class);
        for (TeamTemplatesMsg.OutMsg.Entry e: es) {
            TTask task = new TTask();
            task.setTitle(e.name);
            task.setType(Const.TASK_TYPE.ENTRY);
            task.setPos(e.pos);
            task.setParentId(project.getId());
            task.setCreaterId(project.getOwnerId());
            task.setCreateTime(new Date());
            tTaskMapper.insert(task);
        }
    }

    /**
     * 获取组中成员数
     * @param pid
     * @return
     */
    public long getProjectMemberCount(long pid){
        TUserRoleExample query = new TUserRoleExample();
        query.or().andProjectIdEqualTo(pid);
        return tUserRoleMapper.countByExample(query);
    }

    /**
     * 获取用户在项目中的角色
     * @param uid
     * @param pid
     * @return
     */
    public TUserRole getRoleInProject(long uid,long pid){
        TUserRoleExample query = new TUserRoleExample();
        TUserRoleExample.Criteria criteria = query.createCriteria();
        criteria.andUserIdEqualTo(uid).andProjectIdEqualTo(pid);

        List<TUserRole> roles = tUserRoleMapper.selectByExample(query);
        if (roles!=null && roles.size()==1)
            return roles.get(0);
        return null;
    }
}
