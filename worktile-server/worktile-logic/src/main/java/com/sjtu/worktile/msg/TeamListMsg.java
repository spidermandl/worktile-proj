package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 07/02/2017.
 * 获取团队信息协议
 */
public class TeamListMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 3001;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public List<Team> data = new ArrayList<>();

    }


    @Override
    void initMsg() {
        inMsg = new TeamListMsg.InMsg();
        outMsg = new TeamListMsg.OutMsg();
    }
}
