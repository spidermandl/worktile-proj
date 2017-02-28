package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 21/02/2017.
 * 项目模板消息
 */
public class TeamTemplatesMsg extends PairMsg{
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 3006;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public List<TeamTemplatesMsg.OutMsg.Template> data = new ArrayList<>();

        public static class Template{
            public long template_id= 0;
            public String name =null;
            public List<Entry> entries = new ArrayList<>();
        }

        public static class Entry{
            public String name= null;
            public float pos = 0;
        }

    }


    @Override
    void initMsg() {
        inMsg = new TeamProjectMsg.InMsg();
        outMsg = new TeamProjectMsg.OutMsg();
    }
}
