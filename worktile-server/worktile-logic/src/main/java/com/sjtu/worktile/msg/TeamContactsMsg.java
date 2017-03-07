package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 13/02/2017.
 * 获取所有团队里的联系人
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
        public List<User> data = new ArrayList<>();
    }

    @Override
    void initMsg() {
        inMsg = new TeamContactsMsg.InMsg();
        outMsg = new TeamContactsMsg.OutMsg();
    }
}
