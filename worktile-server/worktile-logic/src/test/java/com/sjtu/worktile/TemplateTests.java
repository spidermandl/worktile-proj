package com.sjtu.worktile;

import com.alibaba.fastjson.JSON;
import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.msg.TemplateNewMsg;
import com.squareup.okhttp.FormEncodingBuilder;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;
import org.junit.Test;

/**
 * Created by Desmond on 27/02/2017.
 */
public class TemplateTests extends BaseTest{

    @Test
    public void getAllEntriesTemplate() throws Exception {
        String token = super.getToken();
        String url=domain_url+"/api/template/entries";

        Request request= null;
        Response response = null;

        request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .get()
                .build();
        response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
    @Test
    public void initStaticTemplate() throws Exception{
        String token = super.getToken();
        String url=domain_url+"/api/template/create";

        Request request= null;
        Response response = null;


        request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .post(
                        new FormEncodingBuilder()
                                .add("t_name", "通用")
                                .add("entries", "[{\"name\":\"要做\",\"pos\":65535},{\"name\":\"在做\",\"pos\":131071},{\"name\":\"待定\",\"pos\":196606}]")
                                .build()
                        )
                .build();
        response = client.newCall(request).execute();
        System.out.println(response.body().string());

        request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .post(
                        new FormEncodingBuilder()
                                .add("t_name", "研发")
                                .add("entries", "[{\"name\":\"收件箱\",\"pos\":65535},{\"name\":\"开发中\",\"pos\":131071},{\"name\":\"待测试\",\"pos\":196606},{\"name\":\"待发布\",\"pos\":262141},{\"name\":\"已发布\",\"pos\":327676}]")
                                .build()

                ).build();
        response = client.newCall(request).execute();
        System.out.println(response.body().string());

        request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .post(
                        new FormEncodingBuilder()
                                .add("t_name", "产品Roadmap")
                                .add("entries", "[{\"name\":\"收件箱\",\"pos\":65535},{\"name\":\"待发布\",\"pos\":131071},{\"name\":\"已发布\",\"pos\":196606},{\"name\":\"已完成\",\"pos\":262141}]")
                                .build()
                    ).build();
        response = client.newCall(request).execute();
        System.out.println(response.body().string());

        request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .post(
                        new FormEncodingBuilder()
                                .add("t_name", "CRM 模板")
                                .add("entries", "[{\"name\":\"客户资料库\",\"pos\":65535},{\"name\":\"销售机会\",\"pos\":131071},{\"name\":\"联系中\",\"pos\":196606},{\"name\":\"已联系\",\"pos\":262141},{\"name\":\"售前\",\"pos\":327676},{\"name\":\"成单\",\"pos\":393211},{\"name\":\"售后\",\"pos\":458746}]")
                                .build()

                     ).build();
        response = client.newCall(request).execute();
        System.out.println(response.body().string());

        request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .post(
                        new FormEncodingBuilder()
                                .add("t_name", "Bug管理")
                                .add("entries", "[{\"name\":\"收件箱\",\"pos\":65535},{\"name\":\"开发\",\"pos\":131071},{\"name\":\"测试\",\"pos\":196606},{\"name\":\"上线\",\"pos\":262141}]")
                                .build()
                    ).build();
        response = client.newCall(request).execute();
        System.out.println(response.body().string());

        request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .post(
                        new FormEncodingBuilder()
                                .add("t_name", "招聘流程")
                                .add("entries", "[{\"name\":\"简历库\",\"pos\":65535},{\"name\":\"笔试\",\"pos\":131071},{\"name\":\"面试\",\"pos\":196606},{\"name\":\"试用期\",\"pos\":262141},{\"name\":\"入职\",\"pos\":327676}]")
                                .build()
                       ).build();
        response = client.newCall(request).execute();
        System.out.println(response.body().string());

        request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .post(
                        new FormEncodingBuilder()
                                .add("t_name", "内容编辑")
                                .add("entries", "[{\"name\":\"策划组稿\",\"pos\":65535},{\"name\":\"选题\",\"pos\":131071},{\"name\":\"初稿\",\"pos\":196606},{\"name\":\"审稿\",\"pos\":262141},{\"name\":\"校对\",\"pos\":327676},{\"name\":\"定稿\",\"pos\":393211},{\"name\":\"发布\",\"pos\":458746}]")
                                .build()
                      ).build();
        response = client.newCall(request).execute();
        System.out.println(response.body().string());

        request = new Request.Builder()
                .url(url)
                .addHeader("raw","raw")
                .addHeader("Authorization", Const.TOKEN_PREFIX+token)
                .post(
                        new FormEncodingBuilder()
                                .add("t_name", "产品设计")
                                .add("entries", "[{\"name\":\"需求了解\",\"pos\":65535},{\"name\":\"头脑风暴\",\"pos\":131071},{\"name\":\"想法\\b收缩\",\"pos\":196606},{\"name\":\"原型\",\"pos\":262141},{\"name\":\"验证与测试\",\"pos\":327676}]")
                                .build()
                        ).build();
        response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}
