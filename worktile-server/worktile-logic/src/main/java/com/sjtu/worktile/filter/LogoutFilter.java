package com.sjtu.worktile.filter;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.SessionException;
import org.apache.shiro.subject.Subject;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * Created by Desmond on 10/02/2017.
 * 用户登出过滤器
 */
public class LogoutFilter extends AbsPathFilter{

    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        Subject subject = this.getSubject(request, response);

        try {
            subject.logout();
        } catch (SessionException var6) {

        }

        return false;
    }

    protected Subject getSubject(ServletRequest request, ServletResponse response) {
        return SecurityUtils.getSubject();
    }

}
