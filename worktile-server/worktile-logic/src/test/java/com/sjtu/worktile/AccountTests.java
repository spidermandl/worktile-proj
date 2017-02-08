package com.sjtu.worktile;

import com.alibaba.fastjson.JSON;
import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.msg.LoginMsg;
import com.squareup.okhttp.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

/**
 * Created by Desmond on 05/01/2017.
 * 用户相关api测试
 */
//@RunWith(SpringRunner.class)
//@SpringBootTest
public class AccountTests extends BaseTest{

    @Test
    public void register() throws Exception{
        MediaType MEDIA_TYPE_TEXT = MediaType.parse("text/plain");
        String postBody = "Hello World";
        Request request = new Request.Builder()
                .url(domain_url)
                .post(RequestBody.create(MEDIA_TYPE_TEXT, postBody))
                .build();

        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            throw new IOException("服务器端错误: " + response);
        }

        System.out.println(response.body().string());

    }

    @Test
    public void signUp() throws Exception{
        String url = domain_url+"/user/login";
        /**
         * 正确用户名登录
         */
        Request request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .post(RequestBody.create(MEDIA_TYPE_TEXT, JSON.toJSONString(new LoginMsg.InMsg(){
                    {
                        phone = null;//用户电话
                        username = "desmond";//用户名
                        password = "111111";//用户密码
                    }
                })))
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
        /**
         * 不存在用户登录
         */
        request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .post(RequestBody.create(MEDIA_TYPE_TEXT, JSON.toJSONString(new LoginMsg.InMsg(){
                    {
                        phone = null;//用户电话
                        username = "desmond1";//用户名
                        password = "111111";//用户密码
                    }
                })))
                .build();
        response = client.newCall(request).execute();
        System.out.println(response.body().string());
        /**
         * 密码错误用户登录
         */
        request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .post(RequestBody.create(MEDIA_TYPE_TEXT, JSON.toJSONString(new LoginMsg.InMsg(){
                    {
                        phone = null;//用户电话
                        username = "desmond";//用户名
                        password = "111112";//用户密码
                    }
                })))
                .build();
        response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }

    /**
     * 获取用户基本信息
     * @throws Exception
     */
    @Test
    public void getProfile() throws Exception{
        String token = super.getToken();

        String url = domain_url+"/api/me/profile";
        /**
         * 正确用户名登录
         */
        Request request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .get().build();

        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}
