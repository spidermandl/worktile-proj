package com.sjtu.worktile;

import com.alibaba.fastjson.JSON;
import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.msg.RegisterMsg;
import com.sjtu.worktile.msg.TaskInsertMsg;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;
import org.junit.Test;

/**
 * Created by lenovo on 2017/2/21.
 */
public class TaskTests extends BaseTest {
    @Test
    public void insert() throws Exception{
        /**
         * 新增任务
         */
        String url=domain_url+"/api/task/insert";
        String token=super.getToken();
        Request request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization",  Const.TOKEN_PREFIX+token)
                .post(RequestBody.create(MEDIA_TYPE_TEXT, JSON.toJSONString(new TaskInsertMsg.InMsg(){
                    {
                        entry_id=1;//任务组id
                        title="aaa";//任务标题
                    }
                }))).build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}
