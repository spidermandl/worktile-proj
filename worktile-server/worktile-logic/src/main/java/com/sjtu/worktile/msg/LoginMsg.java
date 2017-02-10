package com.sjtu.worktile.msg;

/**
 * Created by Desmond on 04/01/2017.
 * 登录协议相关消息
 */
public class LoginMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 1001;

    public static final String K_PHONE = "phone";
    public static final String K_USERNAME = "username";
    public static final String K_PASSWORD = "password";

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
        public String phone = null;//用户电话
        public String username = null;//用户名
        public String password = null;//用户密码
    }

    public static class OutMsg implements ResponseMsg{
        public int code =MSG_CODE;
        public String token =null;//验证token
    }

    @Override
    void initMsg() {
        inMsg = new InMsg();
        outMsg = new OutMsg();
    }
}
