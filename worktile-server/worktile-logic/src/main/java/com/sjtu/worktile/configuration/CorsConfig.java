package com.sjtu.worktile.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by Desmond on 04/02/2017.
 * 检测跨域规则
 */
//@Configuration
//public class CorsConfig extends WebMvcConfigurerAdapter {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowedMethods("DELETE", "HEAD", "GET", "OPTIONS", "POST", "PUT")
//                .allowedHeaders("authorization","x-requested-with")
//                .maxAge(3600);
//    }
//}
