package com.sjtu.worktile.msg;

/**
 * Created by lenovo on 2017/2/21.
 */
public class TaskNewMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 5002;

    public static class InMsg implements RequestMsg{
        public int code=MSG_CODE;
        public int pid=0;//项目id
        public int entry_id = 0;//任务组id
        public String[] names = null;//任务名
        public long[] members = null;//被分派任务成员
        int is_locked = 0;//项目是否锁定
        long expire_date =0;//过期日期
        public String[] labels = null;//标签名
        public String pos_type = null;//位置类型

    }


    public static class OutMsg implements ResponseMsg{
        public int code=MSG_CODE;
        public Task data = new Task();
    }

    @Override
    void initMsg(){
        inMsg = new TaskListMsg.InMsg();
        outMsg = new TaskListMsg.OutMsg();
    }
}
