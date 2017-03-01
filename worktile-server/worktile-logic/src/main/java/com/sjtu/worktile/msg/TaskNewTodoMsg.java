package com.sjtu.worktile.msg;

/**
 * Created by lenovo on 2017/2/24.
 */
public class TaskNewTodoMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 5016;

    public static class InMsg implements RequestMsg{
        public int code=MSG_CODE;
        public long task_id=0;//任务id
        public String content=null;//内容
    }

    public static class OutMsg implements ResponseMsg{
        public int code=MSG_CODE;
    }
    @Override
    void initMsg(){

    }
}
