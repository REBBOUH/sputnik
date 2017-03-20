package com.zsoft.web.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zsoft.SputnikApp;
import com.zsoft.domain.NotWorkingDays;
import com.zsoft.repository.NotWorkingDaysRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = SputnikApp.class)

public class NotWorkingDaysControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private NotWorkingDaysRepository notWorkingDaysRepository;

    private NotWorkingDaysController notWorkingDaysController;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        notWorkingDaysController = new NotWorkingDaysController(notWorkingDaysRepository);
        mockMvc = MockMvcBuilders.standaloneSetup(notWorkingDaysController).build();
    }

    @Test
    public void findAll() throws Exception {
        NotWorkingDays day1 = new NotWorkingDays("01", "02,08,22");
        day1.setId("12325");
        NotWorkingDays day2 = new NotWorkingDays("02", "02,22");
        day2.setId("8765");
        assertThat(notWorkingDaysController).isNotNull();

        mockMvc.perform(post("/api/notWorkingDays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());

        mockMvc.perform(post("/api/notWorkingDays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day2)))
            .andDo(print())
            .andExpect(status().isCreated());

        NotWorkingDays day3 = new NotWorkingDays("09", "09");
        day3.setId("5565");

        mockMvc.perform(post("/api/notWorkingDays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day3)))
            .andDo(print())
            .andExpect(status().isCreated());

        mockMvc.perform(get("/api/notWorkingDays"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"));

        day3.setDays("07");
        mockMvc.perform(post("/api/notWorkingDays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day3)))
            .andDo(print())
            .andExpect(status().isCreated());


        mockMvc.perform(delete("/api/notWorkingDays/8765")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isOk());

        mockMvc.perform(get("/api/notWorkingDays"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"))
            .andExpect(content().json("[{\"id\":\"12325\",\"month\":\"01\",\"days\":\"02,08,22\"}," +
                "{\"id\":\"5565\",\"month\":\"09\",\"days\":\"07\"}]"));

    }


}
