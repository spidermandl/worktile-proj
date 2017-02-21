package com.sjtu.worktile.controller;

import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.msg.ErrorMsg;
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

}
