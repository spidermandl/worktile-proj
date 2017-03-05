package com.sjtu.worktile.msg;

/**
 * Created by Desmond on 05/03/2017.
 * 获取一个task信息
 */
public class TaskInfoMsg extends PairMsg{
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 5003;

    public static class InMsg implements PairMsg.RequestMsg {
        public int code=MSG_CODE;
        public int project_id=0;//项目id
        public int task_id = 0;//任务id

    }

    public static class OutMsg implements PairMsg.ResponseMsg {
        public int code=MSG_CODE;
        public Task data = new Task();
    }

    @Override
    void initMsg(){
        inMsg = new TaskInfoMsg.InMsg();
        outMsg = new TaskInfoMsg.OutMsg();
    }
}
