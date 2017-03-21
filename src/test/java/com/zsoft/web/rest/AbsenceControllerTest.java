package com.zsoft.web.rest;


import com.zsoft.SputnikApp;
import com.zsoft.domain.Absence;
import com.zsoft.repository.AbsenceRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SputnikApp.class)
public class AbsenceControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private AbsenceRepository absenceRepository;

    private AbsenceController absenceController;
    Absence day2 = new Absence(LocalDate.now(), false);
    Absence day1 = new Absence(LocalDate.of(2017, 03, 22), true);

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        absenceController = new AbsenceController(absenceRepository);
        mockMvc = MockMvcBuilders.standaloneSetup(absenceController).build();

    }

    @Test
    public void findAll() throws Exception {
        assertThat(absenceController).isNotNull();

        mockMvc.perform(get("/api/absence"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"));
    }

    @Test
    public void saveAbsence() throws Exception {
        mockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());

        mockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day2)))
            .andDo(print())
            .andExpect(status().isCreated());
        findAll();
    }
    @Test
    public void UpdateAbsence() throws Exception {
        mockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());

        day1.setDemiJournee(false);

        mockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());
        findAll();
    }

    @Test
    public void deleteAbsence() throws Exception{
        day1.setId("123");
        mockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());
        mockMvc.perform(delete("/api/absence/123")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isOk());
        findAll();

    }

    @Test
    public void deleteAllAbsences() throws Exception{
        mockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());

        mockMvc.perform(delete("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes("")))
            .andDo(print())
            .andExpect(status().isOk());

        findAll();

    }


}
