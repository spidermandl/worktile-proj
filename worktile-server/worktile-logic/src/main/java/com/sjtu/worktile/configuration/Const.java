package com.sjtu.worktile.configuration;

/**
 * Created by Desmond on 07/01/2017.
 * 常量配置类
 */
public class Const {
    /**
     * token 过期时间
     */
    public final static int TOKEN_EXPIRE_TIME = 12*60*60*1000;
    /**
     * token 加密私钥口令
     */
    public final static String JWT_TOEKN_SECRET_KEY="sjtu_worktile";
    /**
     * httprequest attribute key
     */
    public final static String JWT_KEY = "JAVA_WEB_TOEKN";
    /**
     * token的前缀
     */
    public final static String TOKEN_PREFIX = "Bearer ";

    /**
     * token包含userid的key名
     */
    public final static String TOKEN_UID = "token_user_id";


}
