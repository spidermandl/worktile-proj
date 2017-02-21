package com.sjtu.worktile.controller;


import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.TUser;
import com.sjtu.worktile.msg.MeMsg;
import com.sjtu.worktile.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


/**
 * Created by Desmond on 01/01/2017.
 * 用户相关api
 */
@RestController
@RequestMapping("/api/me")
public class MeController extends BaseController{

    @Autowired
    private UserService userService;

    @RequestMapping(value = "profile", method = RequestMethod.GET)
    @ResponseBody
    public MeMsg.OutMsg me(final HttpServletRequest request) throws AppException{
        long uid = super.getUserID(request);
        MeMsg.OutMsg outMsg = new MeMsg.OutMsg();
        TUser user = userService.findUserByID(uid);
        /**
         * 填充数据
         */
        outMsg.data.uid = uid;
        outMsg.data.username = user.getAccount();
        outMsg.data.phone = user.getPhone();
        outMsg.data.email = user.getEmail();
        outMsg.data.icon = user.getHead();
        outMsg.data.position = user.getPosition();
        outMsg.data.department = user.getDepartment();
        outMsg.data.nick = user.getSignature();
        outMsg.data.wechat = user.getWechat();
        outMsg.data.display_name = user.getSignature()==null?user.getAccount():user.getSignature();

        outMsg.data.pref = new MeMsg.Preference();
        outMsg.data.pref.language = 0;
        outMsg.data.pref.autoFocus = 0;
        outMsg.data.pref.autoAssign = 0;
        outMsg.data.pref.background = 0;

        return outMsg;
    }
}
