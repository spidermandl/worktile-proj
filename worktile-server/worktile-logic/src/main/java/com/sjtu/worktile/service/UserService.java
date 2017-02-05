package com.sjtu.worktile.service;

import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.helper.JwtHelper;
import com.sjtu.worktile.helper.PasswordHelper;
import com.sjtu.worktile.model.TUser;
import com.sjtu.worktile.model.TUserExample;
import com.sjtu.worktile.model.TUserRole;
import com.sjtu.worktile.model.TUserRoleExample;
import com.sjtu.worktile.model.mappers.TUserMapper;
import com.sjtu.worktile.model.mappers.TUserRoleMapper;
import com.sjtu.worktile.shiro.MultiNamePasswordToken;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 06/01/2017.
 */
@Service
public class UserService {

    @Autowired
    private DefaultWebSecurityManager securityManager;
    @Autowired
    private PasswordHelper pHelper;

    @Autowired
    private TUserMapper tUserMapper;
    @Autowired
    private TUserRoleMapper tUserRoleMapper;


    private List<TUserRole> findRoles(TUser user){
        TUserRoleExample query = new TUserRoleExample();
        query.or().andUserIdEqualTo(user.getId());
        return tUserRoleMapper.selectByExample(query);
    }
    /**
     * 从数据库中获取用户
     * @param condition
     * @return
     */
    public List<TUser> findUsers(TUser condition){
        TUserExample query = new TUserExample();
        if (condition.getAccount()!=null)
            query.or().andAccountEqualTo(condition.getAccount());
        else if (condition.getPhone()!=null)
            query.or().andPhoneEqualTo(condition.getPhone());
        else
            return null;
        List<TUser> users = tUserMapper.selectByExample(query);
        return users;
    }
    /**
     *  验证登录用户
     * @param user
     */
    public String authUser(TUser user) throws AppException {
        List<TUser> users = findUsers(user);
        /**
         * 验证操作
         */
        if (users!=null && users.size()>0) {
            //SecurityUtils.setSecurityManager(securityManager);
            //得到Subject及创建用户名/密码身份验证Token（即用户身份/凭证）
            Subject subject = SecurityUtils.getSubject();
            MultiNamePasswordToken token = new MultiNamePasswordToken(user.getAccount(), user.getPassword());
            token.setRealUser(users.get(0));
            try {
                subject.login(token);
            }catch (AuthenticationException e){
                throw new AppException(AppException.CATEGORY.USER_LOGIN_INVALID);
            }

            /**
             * 获取用户角色
             */
            List<TUserRole> roles = findRoles(users.get(0));
            List<String> roleNames = new ArrayList<String>();
            if (roles!=null){
                for (TUserRole role:roles){
                    roleNames.add(String.valueOf(role.getRoleId()));
                }
            }
            return JwtHelper.createJWT(users.get(0).getAccount(),
                    String.valueOf(users.get(0).getId()),
                    roleNames,"","", Const.TOKEN_EXPIRE_TIME,Const.JWT_TOEKN_SECRET_KEY);
        }else{
            throw new AppException(AppException.CATEGORY.USER_NOT_FOUND);
        }
    }

    /**
     * 创建用户
     * @param user
     * @throws AppException
     */
    public void createUser(TUser user) throws AppException {
        List<TUser> users = findUsers(user);
        if (users!= null && users.size()>0){
            throw new AppException(AppException.CATEGORY.USER_ALREADY_EXIST);
        }
        pHelper.encryptPassword(user);
        tUserMapper.insert(user);
    }
}
