package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 22/02/2017.
 * feed 消息列表
 */
public class FeedListMsg extends PairMsg{

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 7001;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public List<FeedInfo> data = new ArrayList<>();

        public static class FeedInfo{
            public Actor actor = new Actor();
            public String verb = null;//操作类型
            public String template = null;//操作模板
            public Data data = new Data() {
                public EventInfo entity = null;
                public EventInfo target = null;
            };
            public long published = 0;//发布时间
            public Filter filter = null;
            public String project_name =null;//项目名称

        }
        /**
         * 操作人员
         */
        public static class Actor{
            public String avatar = null;//头像
            public String display_name = null;//显示姓名
            public String name = null;//用户名
            public long uid = 0;//"用户id
        }

        public static class EventInfo{
            public String etype = null;
            public String name = null;
            public long eid = 0;
        }

        public static class Filter{
            public String ftype = null;
            public long prj = 0;
            public long item = 0;
        }
    }


    @Override
    void initMsg() {
        inMsg = new FeedListMsg.InMsg();
        outMsg = new FeedListMsg.OutMsg();
    }
}
