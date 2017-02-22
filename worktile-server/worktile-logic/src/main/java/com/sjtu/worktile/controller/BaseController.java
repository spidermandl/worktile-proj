package com.sjtu.worktile.controller;

import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.TUser;
import com.sjtu.worktile.msg.ErrorMsg;
import com.sjtu.worktile.msg.PairMsg;
import io.jsonwebtoken.Claims;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Desmond on 07/02/2017.
 */
abstract public class BaseController {

    /**
     * 获取token中的userid
     * @param request
     * @return
     */
    protected long getUserID(final HttpServletRequest request) throws AppException{
        final Claims claims = (Claims) request.getAttribute("claims");
        try {
            long id = Long.parseLong(claims.get(Const.TOKEN_UID).toString());
            return id;
        }catch (Exception e){
            throw new AppException(AppException.CATEGORY.TOKEN_PARSE_FAILURE);
        }
    }

    /**
     * 统一处理AppException
     * @param req
     * @param e
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value = AppException.class)
    @ResponseBody
    public ErrorMsg.OutMsg appErrorHandler(HttpServletRequest req, AppException e) throws Exception {
        ErrorMsg.OutMsg msg = new ErrorMsg.OutMsg();
        msg.error_code = e.getErrorCode();
        return msg;
    }

    /**
     * 将tUser的内容赋给rUser
     * @param rUser
     * @param tUser
     */
    protected void mappingToUserMsg(PairMsg.ResponseMsg.User rUser, TUser tUser){
        rUser.uid = tUser.getId();
        rUser.name = tUser.getAccount();
        rUser.email = tUser.getEmail();
        rUser.display_name = tUser.getSignature()==null?tUser.getAccount():tUser.getSignature();
        rUser.avatar = tUser.getHead();//用户头像
        //rUser.desc ;
        //rUser.status ;//用户状态：1：正常，2：邀请，3：需要邮件确认
        //rUser.phone_prefix ;
        rUser.phone = tUser.getPhone();
        //t.owner.title = ;
        rUser.department = tUser.getDepartment();
    }

}
