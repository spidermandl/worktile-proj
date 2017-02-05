package com.sjtu.worktile.filter;

import com.sjtu.worktile.exception.AppException;
import org.apache.shiro.web.filter.PathMatchingFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.http.HttpMethod;

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
     * 检测跨域
     * @param req
     */
    private void checkCros(ServletRequest req, ServletResponse resp){
        //if(HttpMethod.OPTIONS.matches(((HttpServletRequest)req).getMethod())) {
            ((HttpServletResponse) resp).setHeader("Access-Control-Allow-Origin", "*");
            ((HttpServletResponse) resp).setHeader("Access-Control-Allow-Methods", "POST,GET");
            ((HttpServletResponse) resp).setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
        //}
    }

    @Override
    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        checkCros(request,response);
        return true;
    }

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
