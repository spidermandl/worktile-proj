package com.sjtu.worktile.service;

import com.sjtu.worktile.model.SPermission;
import com.sjtu.worktile.model.SPermissionExample;
import com.sjtu.worktile.model.SRole;
import com.sjtu.worktile.model.SRoleExample;
import com.sjtu.worktile.model.mappers.SPermissionMapper;
import com.sjtu.worktile.model.mappers.SRoleMapper;
import com.sjtu.worktile.model.mappers.TUserRoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Desmond on 22/02/2017.
 */
@Service
public class RoleService {

    @Autowired
    private SRoleMapper sRoleMapper;

    @Autowired
    private SPermissionMapper sPermissionMapper;

    public List<SPermission> getRolePermissions(int rid){
        SPermissionExample query = new SPermissionExample();
        SPermissionExample.Criteria criteria = query.createCriteria();
        criteria.andRoleIdEqualTo(rid);

        return sPermissionMapper.selectByExample(query);

    }

}
