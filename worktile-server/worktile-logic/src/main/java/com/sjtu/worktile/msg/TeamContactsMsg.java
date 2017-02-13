package com.sjtu.worktile.msg;

import java.util.List;

/**
 * Created by Desmond on 13/02/2017.
 */
public class TeamContactsMsg extends PairMsg{
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 3002;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public List<Data> data = null;
        /**
         * 个人信息输出格式
         */
        public static class Data implements ResponseMsg.Data{
            public int uid = 0;//用户id
            public String display_name = null;//显示姓名
            public String icon = null;//头像
        }
    }

    @Override
    void initMsg() {
        inMsg = new TeamContactsMsg.InMsg();
        outMsg = new TeamContactsMsg.OutMsg();
    }
}
