package com.sjtu.worktile.controller;

import com.sjtu.worktile.configuration.Const;
import io.jsonwebtoken.Claims;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Desmond on 07/02/2017.
 */
abstract  public class BaseController {

    /**
     * 获取token中的userid
     * @param request
     * @return
     */
    protected int getUserID(final HttpServletRequest request){
        final Claims claims = (Claims) request.getAttribute("claims");
        return (Integer) claims.get(Const.TOKEN_UID);
    }
}
