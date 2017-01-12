package com.sjtu.worktile.msg;

/**
 * Created by Desmond on 10/01/2017.
 * 错误信号返回
 */
public class ErrorMsg extends PairMsg{

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 1000;

    public static class OutMsg implements ResponseMsg{
        public int code = MSG_CODE;
        public int error_code = 0;
    }

    @Override
    void initMsg() {
        inMsg = new RequestMsg(){

        };
        outMsg = new ErrorMsg.OutMsg();
    }
}
