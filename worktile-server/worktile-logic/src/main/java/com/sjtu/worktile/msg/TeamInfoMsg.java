package com.sjtu.worktile.msg;

import java.util.Date;

/**
 * Created by Desmond on 19/02/2017.
 * 获取指定team基本信息
 */
public class TeamInfoMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 3004;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public Team data = new Team();


    }
    @Override
    void initMsg() {
        inMsg = new TeamInfoMsg.InMsg();
        outMsg = new TeamInfoMsg.OutMsg();
    }
}
