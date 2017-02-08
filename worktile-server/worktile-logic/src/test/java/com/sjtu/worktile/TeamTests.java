package com.sjtu.worktile;

import com.sjtu.worktile.configuration.Const;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import org.junit.Test;

/**
 * Created by Desmond on 07/02/2017.
 * 团队相关api 测试
 */
public class TeamTests extends BaseTest {

    /**
     * /api/team/list
     * @throws Exception
     */
    @Test
    public void teamList() throws Exception{
        String token = super.getToken();

        String url = domain_url+"/api/team/list";
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
