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

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
        public String phone = null;//用户电话
        public String username = null;//用户名
        public String password = null;//用户密码
    }

    public static class OutMsg implements ResponseMsg{
        public int code =MSG_CODE;
        public int error_code = 0;
        public String token =null;//验证token
        public Data data = new Data() {
            public int uid = 0;//用户id
            public String account = null;//用户名
            public String nickname = null;//用户昵称
            public String group_id = null;//用户角色
            public int last_login_time =0;//最近登录时间
        };
    }

    @Override
    void initMsg() {
        inMsg = new InMsg();
        outMsg = new OutMsg();
    }
}
