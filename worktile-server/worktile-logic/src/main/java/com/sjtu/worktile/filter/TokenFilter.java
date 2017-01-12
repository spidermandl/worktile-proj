package com.sjtu.worktile.filter;

import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.helper.JwtHelper;
import io.jsonwebtoken.SignatureException;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Author: Desmond
 * 验证http头部的token
 */
public class TokenFilter extends AbsPathFilter {

    @Override
    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws IOException{
        final HttpServletRequest req = (HttpServletRequest) request;

        final String authHeader = req.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith(Const.TOKEN_PREFIX)) {
            return redirectToErrorUrl(req,response,new AppException(AppException.CATEGORY.AUTHORIZATION_HEAD_MISSING));
        }

        final String token = authHeader.substring(Const.TOKEN_PREFIX.length()); // The part after "Bearer "

        try {
            request.setAttribute("claims", JwtHelper.parseJWT(token, Const.JWT_TOEKN_SECRET_KEY));
        }
        catch (final SignatureException e) {
            return redirectToErrorUrl(req,response,new AppException(AppException.CATEGORY.TOKEN_PARSE_FAILURE));
        }
        return true;
    }
}
