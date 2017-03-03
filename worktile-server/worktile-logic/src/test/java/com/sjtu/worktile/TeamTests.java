package com.sjtu.worktile;

import com.sjtu.worktile.configuration.Const;
import com.squareup.okhttp.FormEncodingBuilder;
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

    /**
     * /api/team/contacts
     * @throws Exception
     */
    @Test
    public void teamContacts() throws Exception{
        String token = super.getToken();

        String url = domain_url+"/api/team/contacts";
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

    /**
     * /api/team/{team_id}/contacts
     * @throws Exception
     */
    @Test
    public void teamSingleContacts() throws Exception{
        String token = super.getToken();

        String url = domain_url+"/api/team/1/contacts";
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

    /**
     * /api/team/invite
     * @throws Exception
     */
    @Test
    public void inviteMembers() throws Exception{
        String token = super.getToken();

        String url = domain_url+"/api/team/invite";

        Request request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization",  Const.TOKEN_PREFIX+token)
                .post( new FormEncodingBuilder()
                        .add("team_id", "1")
                        .add("members", "")
                        .add("type","1")
                        .add("parent_id","1")
                        .build()
                ).build();

        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}
