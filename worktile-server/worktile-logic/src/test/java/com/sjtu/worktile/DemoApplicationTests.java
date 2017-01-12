package com.sjtu.worktile;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
////相当于  --spring.profiles.active=dev
//@ActiveProfiles(value="dev")
public class DemoApplicationTests {

	@Test
	public void contextLoads() {

	}

}
