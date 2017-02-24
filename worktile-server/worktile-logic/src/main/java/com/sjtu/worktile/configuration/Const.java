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
     * 允许跨域 header字段
     */
    public final static String CROS_ALLOWED_HEADER = "authorization";
    /**
     * token包含userid的key名
     */
    public final static String TOKEN_UID = "token_user_id";

    /**
     * 用户权限: 31:管理员，15:成员，7:访客，5:来宾，0:无法操作
     */
    public final static class USER_PERMISSIOIN{
        public static final int ADMIN =31;
        public static final int MEMBER =15;
        public static final int VISITOR =7;
        public static final int GUEST =5;
        public static final int UNKONOWN =0;
    }

    /**
     * 用户角色: 1:管理员，2:成员，3:访客，4:来宾,公开项目可以访问
     */
    public final static class USER_ROLE{
        public static final int ADMIN =1;
        public static final int MEMBER =2;
        public static final int VISITOR =3;
        public static final int GUEST =4;
    }

    /**
     * 任务类型: 1:entry，2:普通task
     */
    public final static class TASK_TYPE{
        public static final int ENTRY =1;
        public static final int TASK =2;
    }

}
