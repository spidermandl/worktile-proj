package com.sjtu.worktile;

import com.alibaba.fastjson.JSON;
import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.msg.TaskNewMsg;
import com.squareup.okhttp.FormEncodingBuilder;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;
import org.junit.Test;

/**
 * Created by lenovo on 2017/2/21.
 */
public class TaskTests extends BaseTest {
    @Test
    public void create() throws Exception{
        /**
         * 新增任务
         */
        String url=domain_url+"/api/task/create";
        String token=super.getToken();
        Request request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization",  Const.TOKEN_PREFIX+token)
                .post( new FormEncodingBuilder()
                        .add("entry_id", "1")
                        .add("title", "aaa")
                        .add("type","1")
                        .add("parent_id","1")
                        .build()
                ).build();
        //                        RequestBody.create(MEDIA_TYPE_TEXT, JSON.toJSONString(new TaskNewMsg.InMsg(){
//                    {
//                        entry_id=1;//任务组id
//                        title="aaa";//任务标题
//                    }
//                }
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }

    @Test
    public void revise()throws Exception{
        /**
         * 修改任务
         */
        String url=domain_url+"/api/task/revise";
        String token=super.getToken();
        Request request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization",  Const.TOKEN_PREFIX+token)
                .post( new FormEncodingBuilder()
                        .add("task_id", "5")
                        .add("title", "bbb")
                        .add("desc","bbb")
                        .build()
                ).build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }

    @Test
    public void assign()throws Exception{
        /**
         * 分配任务
         */
        String url=domain_url+"/api/task/assign";
        String token=super.getToken();
        Request request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization",  Const.TOKEN_PREFIX+token)
                .post( new FormEncodingBuilder()
                        .add("task_id", "5")
                        .add("assigner_id", "1")
                        .add("attach_id","1")
                        .build()
                ).build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }

    @Test
    public void cancelassign()throws Exception{
        /**
         * 取消分配任务
         */
        String url=domain_url+"/api/task/cancelassignment";
        String token=super.getToken();
        Request request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization",  Const.TOKEN_PREFIX+token)
                .post( new FormEncodingBuilder()
                        .add("task_assign_id", "3")
                        .build()
                ).build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}
