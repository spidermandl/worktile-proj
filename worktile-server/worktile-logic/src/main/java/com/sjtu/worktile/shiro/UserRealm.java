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

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        TUser user = ((MultiNamePasswordToken)authenticationToken).getRealUser();

        if(user == null) {
            throw new UnknownAccountException();//没找到帐号
        }
//
//        if(false) {
//            throw new LockedAccountException(); //帐号锁定
//        }

        //交给AuthenticatingRealm使用CredentialsMatcher进行密码匹配，如果觉得人家的不好可以自定义实现
        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                user.getAccount(), //用户名
                user.getPassword(), //密码
                ByteSource.Util.bytes(user.getAccount() + user.getSalt()),//salt=username+salt
                getName()  //realm name
        );

        return authenticationInfo;
    }
}
