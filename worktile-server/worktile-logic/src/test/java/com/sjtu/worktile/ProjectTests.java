package com.sjtu.worktile;

import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.msg.PairMsg;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import org.junit.Test;


/**
 * Created by lenovo on 2017/2/17.
 * 项目相关api测试
 */
public class ProjectTests extends BaseTest {
    @Test
    public void projectList()throws Exception{
        String token=super.getToken();

        String url=domain_url+"/api/project/list";
        /**
         * 正确用户名登陆
         */
        Request request=new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .get().build();

        Response response=client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}
