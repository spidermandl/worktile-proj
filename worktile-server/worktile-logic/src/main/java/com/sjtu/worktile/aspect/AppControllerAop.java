package com.sjtu.worktile.aspect;

import com.sjtu.worktile.exception.AppException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Desmond on 18/02/2017.
 */
@Aspect
@Component
public class AppControllerAop {

    /*
     * 定义一个切入点
     */
    @Pointcut("execution(* com.sjtu.worktile.controller..*.*(..))"
                +" && "+
              "@annotation(org.springframework.web.bind.annotation.RequestMapping)"
                )
    public void appExceptionFromHead() {}

    @Before("appExceptionFromHead()"
            +" && "+
            "args(request,..)")
    public void doBefore(JoinPoint joinPoint,HttpServletRequest request) throws AppException {

        System.out.println("------------------appExceptionFromHead");
        final AppException e = (AppException) request.getAttribute("exception");
        if (e!=null)
            throw e;
    }
}