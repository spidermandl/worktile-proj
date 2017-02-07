package com.sjtu.worktile.msg;

import java.lang.reflect.Field;

/**
 * Created by Desmond on 04/01/2017.
 * 消息抽象结构
 */
abstract public class PairMsg {


    public PairMsg(){
        initMsg();
    }

    public RequestMsg getInMsg() {
        return inMsg;
    }

    /**
     * 接受消息
     */
    protected RequestMsg inMsg;

    public ResponseMsg getOutMsg() {
        return outMsg;
    }

    /**
     * 回复消息
     */
    protected ResponseMsg outMsg;

    /**
     * 初始化消息结构
     */
    abstract void initMsg();

    public static interface RequestMsg{
        int code = 0;//消息索引号
    }

    public static interface ResponseMsg{
        int code = 0;//消息索引号
        String token = null;//token
        Data data = null;
        public interface Data{

        }
    }

//    /**
//     * 获取消息体内的信息
//     * @param key
//     * @return
//     */
//    public Object getValue(String key){
//        try {
//            Field field = inMsg.getClass().getField(key);
//            return field.get(inMsg);
//        } catch (NoSuchFieldException e) {
//            e.printStackTrace();
//        }   catch (IllegalAccessException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
//
//    /**
//     * 设置request字段
//     * @param key
//     * @param value
//     */
//    public void setReq(String key,Object value){
//        try {
//            Field field = inMsg.getClass().getField(key);
//            field.set(inMsg,value);
//        } catch (NoSuchFieldException e) {
//            e.printStackTrace();
//        }catch (IllegalAccessException e) {
//            e.printStackTrace();
//        }
//    }
//
//    /**
//     * 设置response字段
//     * @param key
//     * @param value
//     */
//    public void setResp(String key,Object value){
//        try {
//            Field field = outMsg.getClass().getField(key);
//            field.set(outMsg,value);
//        } catch (NoSuchFieldException e) {
//            e.printStackTrace();
//        }catch (IllegalAccessException e) {
//            e.printStackTrace();
//        }
//    }
}
