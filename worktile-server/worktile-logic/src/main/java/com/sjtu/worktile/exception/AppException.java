package com.sjtu.worktile.exception;

import javax.servlet.ServletException;

/**
 * Author:Desmond
 * 用户相关操作存在异常
 */
public class AppException extends ServletException {
    public static enum CATEGORY{
        USER_NOT_FOUND(101),//用户没有找到
        USER_ALREADY_EXIST(102),//用户已经存在
        AUTHORIZATION_HEAD_MISSING(103),//认证头丢失
        TOKEN_PARSE_FAILURE(104),;//token认证失败

        private int error_code=0;//错误码

        CATEGORY(int code) {
            this.error_code=code;
        }

        public int getCode(){
            return error_code;
        }
    }

    /**
     * 异常类型
     */
    private CATEGORY type;

    /**
     * 获取错误消息
     * @param type
     * @return
     */
    private static String getMsg(CATEGORY type){
        String result = null;
        switch (type){
            case USER_ALREADY_EXIST:
                result = "USER ALREADY EXIST";
                break;
            case USER_NOT_FOUND:
                result = "USER NOT FOUND";
                break;
            case AUTHORIZATION_HEAD_MISSING:
                result = "Missing or invalid Authorization header.";
                break;
            case TOKEN_PARSE_FAILURE:
                result = "Invalid token.";
                break;
        }
        return result;
    }

    public AppException(CATEGORY type){
        super(getMsg(type));
        this.type = type;
    }

    /**
     * 获取错误码
     * @return
     */
    public int getErrorCode(){
        return type.getCode();
    }
}
