package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 25/02/2017.
 * 项目任务列表消息
 */
public class ProjectTasksMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 4004;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg{
        public int code = MSG_CODE;
        public Data data = new Data();
        public static class Data implements ResponseMsg.Data {
            public List<Entry> entries = new ArrayList<>();
            public List<Task> tasks = new ArrayList<>();
        };

    }


    @Override
    void initMsg() {
        inMsg = new ProjectTasksMsg.InMsg();
        outMsg = new ProjectTasksMsg.OutMsg();
    }
}
