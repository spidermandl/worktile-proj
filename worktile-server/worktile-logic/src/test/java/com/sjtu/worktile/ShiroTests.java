package com.sjtu.worktile;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Created by Desmond on 04/01/2017.
 */

//@RunWith(SpringRunner.class)
//@SpringBootTest
public class ShiroTests {
    @Autowired
    private DefaultWebSecurityManager securityManager;

    @Test
    public void login() {
        SecurityUtils.setSecurityManager(securityManager);
        //得到Subject及创建用户名/密码身份验证Token（即用户身份/凭证）
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken("aaa", "bbb");
        subject.login(token);
    }

}
