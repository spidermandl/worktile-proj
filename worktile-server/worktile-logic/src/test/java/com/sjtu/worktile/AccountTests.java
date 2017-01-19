package com.sjtu.worktile;

import com.squareup.okhttp.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

/**
 * Created by Desmond on 05/01/2017.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
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
}
