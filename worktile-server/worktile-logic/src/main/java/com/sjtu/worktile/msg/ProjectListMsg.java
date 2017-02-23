package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lenovo on 2017/2/17.
 * 获取用户所有项目列表
 */
public class ProjectListMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE=4001;

    public static class InMsg implements RequestMsg{
        public int code=MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public List<Project> data = new ArrayList<>();

    }

    @Override
    void initMsg(){
         inMsg=new ProjectListMsg.InMsg();
         outMsg=new ProjectListMsg.OutMsg();
    }
}
