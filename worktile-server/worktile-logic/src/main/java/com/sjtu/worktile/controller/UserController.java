package com.sjtu.worktile.controller;

import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.TUser;
import com.sjtu.worktile.msg.LoginMsg;
import com.sjtu.worktile.msg.RegisterMsg;
import com.sjtu.worktile.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created by Desmond on 01/01/2017.
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    public UserController() {

    }

    /**
     * 登录用户api
     * @param request
     * @return
     * @throws ServletException
     */
    @RequestMapping(value = "login", method = RequestMethod.POST)
    @ResponseBody
    //public LoginMsg.OutMsg login(@RequestBody final LoginMsg.InMsg request)
    public LoginMsg.OutMsg login(final HttpServletRequest request)
            throws ServletException {
        /**
         * 生成返回消息
         */
        LoginMsg.OutMsg out = new LoginMsg.OutMsg();
        out.token = request.getAttribute(Const.JWT_KEY).toString();
        return out;
    }

    /**
     * 注册用户api
     * @param request
     * @return
     * @throws ServletException
     */
    @RequestMapping(value = "register",method = RequestMethod.POST)
    @ResponseBody
    public RegisterMsg.OutMsg register(@RequestBody final RegisterMsg.InMsg request){
        TUser user = new TUser();
        user.setAccount(request.username);
        user.setPhone(request.phone);
        user.setPassword(request.password);
        user.setCreateTime(new Date(System.currentTimeMillis()));

        RegisterMsg.OutMsg out = new RegisterMsg.OutMsg();
        try {
            userService.createUser(user);
        } catch (AppException e) {
            e.printStackTrace();
            out.error_code = e.getErrorCode();
        }

        return out;
    }

}
