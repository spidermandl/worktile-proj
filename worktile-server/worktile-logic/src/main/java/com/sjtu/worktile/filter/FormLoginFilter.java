package com.sjtu.worktile.filter;

import com.alibaba.fastjson.JSON;
import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.helper.SpringHelper;
import com.sjtu.worktile.model.TUser;
import com.sjtu.worktile.msg.LoginMsg;
import com.sjtu.worktile.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.web.util.WebUtils;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

/**
 * Author: Desmond
 * 登录验证过滤器
 */
public class FormLoginFilter extends AbsPathFilter {

    private String loginUrl = "/user/login";//用户登录页面

    @Override
    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;
        if(SecurityUtils.getSubject().isAuthenticated()) {
            //System.out.println("same subject");
            return redirectToSuccessUrl(req,resp);//已经登录过
        }
        if(isLoginRequest(req)) {
            if("post".equalsIgnoreCase(req.getMethod())) {//form表单提交
                boolean loginSuccess = false; //登录
                try {
                    loginSuccess = login(req);
                } catch (AppException e) {
                    e.printStackTrace();
                    return redirectToErrorUrl(req,resp,e);//重定向到error控制器
                }
                if(loginSuccess) {
                    return true;//继续过滤器链
                }
            }
        } else {//保存当前地址并重定向到登录界面
            saveRequestAndRedirectToLogin(req, resp);
        }
        return false;
    }


    /**
     * 登录验证操作
     * @param req
     * @return
     */
    private boolean login(HttpServletRequest req) throws AppException{
        String body = readRequestBody(req);
        LoginMsg.InMsg inMsg =JSON.parseObject(body, LoginMsg.InMsg.class);
        /**
         * 封装请求数据到 TUser
         */
        TUser user = new TUser();
        user.setPhone(inMsg.phone);
        user.setAccount(inMsg.username);
        user.setPassword(inMsg.password);
        /**
         * 生成返回消息
         */
        UserService userService = SpringHelper.getBean(UserService.class);
        String token = userService.authUser(user);
        req.setAttribute(Const.JWT_KEY,token);
        return true;
    }

    private boolean isLoginRequest(HttpServletRequest req) {
        return pathsMatch(loginUrl, WebUtils.getPathWithinApplication(req));
    }

    /**
     * 解析request的body
     * @param request
     * @return
     */
    private String readRequestBody(HttpServletRequest request){
        StringBuilder builder = new StringBuilder();
        try {
            BufferedReader br = request.getReader();
            String str = null;
            while((str = br.readLine()) != null){
                builder.append(str);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return builder.toString();
    }
}
