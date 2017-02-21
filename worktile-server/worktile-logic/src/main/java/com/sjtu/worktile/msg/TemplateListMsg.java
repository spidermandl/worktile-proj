package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 21/02/2017.
 * 获取静态任务模板消息
 */
public class TemplateListMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 6001;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public List<Template> data = new ArrayList<>();

        public static class Template{
            public String category = null;
            public List<CategoryInfo> projects = new ArrayList<>();
        }

        public static class CategoryInfo{
            public String id = null;
            public String name = null;
            public String name_pinyin = null;
            public String description = null;
            public String image = null;
        }

    }


    @Override
    void initMsg() {
        inMsg = new TemplateListMsg.InMsg();
        outMsg = new TemplateListMsg.OutMsg();
    }
}
