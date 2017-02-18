package com.sjtu.worktile.filter;

import com.sjtu.worktile.configuration.Const;
import org.springframework.http.HttpMethod;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Desmond on 05/02/2017.
 */
public class CorsFilter extends AbsPathFilter {

    /**
     * 设置跨域策略
     * @param req
     */
    private void checkCros(ServletRequest req, ServletResponse resp){
        if(((HttpServletRequest)req).getHeader("Origin") != null) {
            ((HttpServletResponse) resp).setHeader("Access-Control-Allow-Origin", "*");
            ((HttpServletResponse) resp).setHeader("Access-Control-Allow-Methods", "DELETE, HEAD, GET, OPTIONS, POST, PUT");
            ((HttpServletResponse) resp).setHeader("Access-Control-Allow-Headers", Const.CROS_ALLOWED_HEADER+", Content-Type");//, X-Requested-With");
        }
    }

    @Override
    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        checkCros(request,response);
        /**
         * cros 预检请求
         */
        if(HttpMethod.OPTIONS.matches(((HttpServletRequest)request).getMethod())
                &&Const.CROS_ALLOWED_HEADER.equalsIgnoreCase(((HttpServletRequest) request).getHeader("Access-Control-Request-Headers"))){
            return false;
        }
        return true;
    }
}
