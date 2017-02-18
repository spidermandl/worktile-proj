package com.sjtu.worktile.msg;

import java.util.List;

/**
 * Created by lenovo on 2017/2/17.
 * 获取用户所有项目列表
 */
public class ProjectListMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE=10009;

    public static class InMsg implements RequestMsg{
        public int code=MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public Data data = new Data();

        public class Data implements ResponseMsg.Data {
            public List<Project> projects = null;//项目信息
        }
    }

        /**
         * Project输出格式
         */
        public static class Project{
            public int project_id=0;//项目id
            public String name=null;//项目名
            public int crew_cap=0;//项目人数上限
            public String description=null;//项目描述
        }

    @Override
    void initMsg(){
         inMsg=new ProjectListMsg.InMsg();
         outMsg=new ProjectListMsg.OutMsg();
    }
}
