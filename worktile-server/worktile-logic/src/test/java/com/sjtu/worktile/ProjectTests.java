package com.sjtu.worktile;

import com.sjtu.worktile.configuration.Const;
import com.squareup.okhttp.FormEncodingBuilder;
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

    @Test
    public void createProject() throws Exception{
        String token=super.getToken();

        String url=domain_url+"/api/project/create";
        /**
         * 正确用户名登陆
         */
        Request request=new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .post(
                        new FormEncodingBuilder()
                                .add("team_id", "1")
                                .add("name", "123")
                                .add("desc","123")
                                .add("template_id","2")
                                .add("template_type","1")
                                .add("visibility","2")
                                .build()
                ).build();
        Response response=client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}
