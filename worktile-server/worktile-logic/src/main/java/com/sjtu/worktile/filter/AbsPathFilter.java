package com.sjtu.worktile.filter;

import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import org.apache.shiro.web.filter.PathMatchingFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.http.HttpMethod;
import org.springframework.http.server.ServerHttpRequest;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Desmond on 10/01/2017.
 */
public abstract class AbsPathFilter extends PathMatchingFilter{

    protected String errorUrl = "/error";//错误连接
    private String successUrl = "/api/home";//用户主页
    private String initUrl = "/";//回退至初始页


    /**
     * 重定向到error控制器
     * @param req
     * @param resp
     * @param e
     * @return
     * @throws IOException
     */
    protected boolean redirectToErrorUrl(ServletRequest req, ServletResponse resp, AppException e) throws IOException {
        System.out.println(errorUrl+"/"+e.getErrorCode());
        WebUtils.redirectToSavedRequest(req, resp, errorUrl+"/"+e.getErrorCode());
        return false;
    }

    protected boolean redirectToSuccessUrl(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        WebUtils.redirectToSavedRequest(req, resp, successUrl);
        return false;
    }

    protected void saveRequestAndRedirectToLogin(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        WebUtils.saveRequest(req);
        WebUtils.issueRedirect(req, resp, initUrl);
    }

}
