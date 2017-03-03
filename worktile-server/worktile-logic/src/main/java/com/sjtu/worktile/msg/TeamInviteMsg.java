package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 03/03/2017.
 * 邀请成员api
 */
public class TeamInviteMsg extends PairMsg{
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 3008;

    public static class InMsg implements PairMsg.RequestMsg {
        public int code = MSG_CODE;
        public long team_id;
        public List<ResponseMsg.User> members;
        public String message;
        public List<Long> project_ids;
    }

    public static class OutMsg implements PairMsg.ResponseMsg {
        public int code = MSG_CODE;
        public List<User> data = new ArrayList<>();

    }
    @Override
    void initMsg() {
        inMsg = new TeamInviteMsg.InMsg();
        outMsg = new TeamInviteMsg.OutMsg();
    }
}
