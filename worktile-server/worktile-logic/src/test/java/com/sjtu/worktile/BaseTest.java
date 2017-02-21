package com.sjtu.worktile;

import com.alibaba.fastjson.JSON;
import com.sjtu.worktile.configuration.ServerProperties;
import com.sjtu.worktile.msg.LoginMsg;
import com.squareup.okhttp.*;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Desmond on 13/01/2017.
 */
public class BaseTest {

    protected MediaType MEDIA_TYPE_TEXT = MediaType.parse("application/json");
    protected MediaType MEDIA_TYPE_FORM = MediaType.parse("application/x-www-form-urlencoded");
    @Autowired
    protected ServerProperties properties;

    protected OkHttpClient client;
    protected String domain_url;

    @Before
    public void initConnection(){
        client = new OkHttpClient();
        if (properties == null) {
            domain_url = "http://localhost:8080";
            return;
        }
        domain_url = properties.getServer_domain()+":"+properties.getPort();
    }

    /**
     * 获取成功登录的token
     * @return
     * @throws Exception
     */
    protected String getToken() throws Exception{
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
        String jsonStr = response.body().string();
        System.out.println(jsonStr);
        LoginMsg.OutMsg msg = JSON.toJavaObject(JSON.parseObject(jsonStr),LoginMsg.OutMsg.class);
        //JSON.toJavaObject(LoginMsg.OutMsg))
        return msg.token;
    }
}
