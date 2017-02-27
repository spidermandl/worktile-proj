package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 27/02/2017.
 * 创建静态模板
 */
public class TemplateNewMsg extends PairMsg{
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 6002;

    public static class InMsg implements PairMsg.RequestMsg {
        public int code = MSG_CODE;
        public String t_name = null;
        public String entries = null;
    }

    public static class OutMsg implements PairMsg.ResponseMsg {
        public int code = MSG_CODE;
    }


    @Override
    void initMsg() {
        inMsg = new TemplateNewMsg.InMsg();
        outMsg = new TemplateNewMsg.OutMsg();
    }
}
