package com.sjtu.worktile.shiro;

import com.sjtu.worktile.model.TUser;
import com.sjtu.worktile.model.TUserExample;
import com.sjtu.worktile.model.mappers.TUserMapper;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 04/01/2017.
 */
public class UserRealm extends AuthorizingRealm {

    private static final Logger logger = LoggerFactory.getLogger(UserRealm.class);

    @Autowired
    TUserMapper tUserMapper;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        String username = (String)authenticationToken.getPrincipal();
        TUserExample query = new TUserExample();
        query.createCriteria().andAccountEqualTo(username);
        List<TUser> users = tUserMapper.selectByExample(query);

        if(users == null || users.size()==0) {
            throw new UnknownAccountException();//没找到帐号
        }
//
//        if(false) {
//            throw new LockedAccountException(); //帐号锁定
//        }

        //交给AuthenticatingRealm使用CredentialsMatcher进行密码匹配，如果觉得人家的不好可以自定义实现
        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                users.get(0).getAccount(), //用户名
                users.get(0).getPassword(), //密码
                ByteSource.Util.bytes(users.get(0).getAccount() + users.get(0).getSalt()),//salt=username+salt
                getName()  //realm name
        );

        return authenticationInfo;
    }
}
