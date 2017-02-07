package com.sjtu.worktile.msg;

/**
 * Created by Desmond on 06/01/2017.
 * 注册协议相关信息
 */
public class RegisterMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 1002;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
        public String phone = null;//电话
        public String username = null;//用户名
        public String password = null;//密码
    }

    public static class OutMsg implements ResponseMsg{
        public int code = MSG_CODE;
        public Data data = new Data() {
            public String uid = null;//用户id
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
