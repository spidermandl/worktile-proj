package com.sjtu.worktile;

import com.sjtu.worktile.configuration.Const;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import org.junit.Test;

/**
 * Created by Desmond on 17/02/2017.
 */
public class ProjectTests extends BaseTest {

    @ Test
    public void projectList() throws Exception{
        String token = super.getToken();

        String url = domain_url+"/api/project/all";
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
