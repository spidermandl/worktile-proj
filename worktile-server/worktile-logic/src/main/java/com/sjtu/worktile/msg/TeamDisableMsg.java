package com.sjtu.worktile.msg;

/**
 * Created by Desmond on 22/02/2017.
 */
public class TeamDisableMsg extends PairMsg{
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 3007;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;

    }


    @Override
    void initMsg() {
        inMsg = new TeamDisableMsg.InMsg();
        outMsg = new TeamDisableMsg.OutMsg();
    }
}
