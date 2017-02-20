package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 20/02/2017.
 * 获取团队项目消息
 */
public class TeamProjectMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 3005;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public List<Project> data = new ArrayList<>();

    }


    @Override
    void initMsg() {
        inMsg = new TeamProjectMsg.InMsg();
        outMsg = new TeamProjectMsg.OutMsg();
    }
}
