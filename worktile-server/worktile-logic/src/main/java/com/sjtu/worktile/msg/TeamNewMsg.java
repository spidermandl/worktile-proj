package com.sjtu.worktile.msg;


/**
 * Created by Desmond on 14/02/2017.
 * 创建team消息
 */
public class TeamNewMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 3003;

    public static class InMsg implements PairMsg.RequestMsg {
        public int code = MSG_CODE;
        public String name =null;//team 名
        public String phone =null;//team 电话
        public int is_support = 0;
        public String desc = null;//team 描述
        public int industry = 0;//team 行业
        public int scale = 0;//team 规模
        public String province = null;
        public String city = null;
        public String district = null;
    }

    public static class OutMsg implements PairMsg.ResponseMsg {
        public int code = MSG_CODE;
        public Team data = new Team();


    }


    @Override
    void initMsg() {
        inMsg = new TeamNewMsg.InMsg();
        outMsg = new TeamNewMsg.OutMsg();
    }
}
