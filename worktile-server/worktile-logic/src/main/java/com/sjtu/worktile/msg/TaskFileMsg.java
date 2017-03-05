package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 05/03/2017.
 * 获取任务附件消息
 */
public class TaskFileMsg extends PairMsg{
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 5004;

    public static class InMsg implements PairMsg.RequestMsg {
        public int code=MSG_CODE;
        public int project_id=0;//项目id
        public int task_id = 0;//任务id

    }

    public static class OutMsg implements PairMsg.ResponseMsg {
        public int code=MSG_CODE;
        public List<Attach> data = new ArrayList<>();
    }

    @Override
    void initMsg(){
        inMsg = new TaskFileMsg.InMsg();
        outMsg = new TaskFileMsg.OutMsg();
    }
}
