package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Desmond on 27/02/2017.
 */
public class TemplateEntriesMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 6003;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public Map<String,List<Entry>> data = new HashMap<>();

    }


    @Override
    void initMsg() {
        inMsg = new TemplateEntriesMsg.InMsg();
        outMsg = new TemplateEntriesMsg.OutMsg();
    }
}
