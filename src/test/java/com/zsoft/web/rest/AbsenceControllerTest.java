package com.zsoft.web.rest;


import com.zsoft.SputnikApp;
import com.zsoft.domain.Absence;
import com.zsoft.repository.AbsenceRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.matchers.Find;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

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
    private MockMvc restAbsenceMockMvc;

    @Autowired
    private AbsenceRepository absenceRepository;

    private AbsenceController absenceController;
    Absence day2 = new Absence(2017, 03, 22, false);
    Absence day1 = new Absence(2017, 03, 23, false);
    Absence day3 = new Absence(2017, 04, 23, false);

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        absenceController = new AbsenceController(absenceRepository);
        restAbsenceMockMvc = MockMvcBuilders.standaloneSetup(absenceController).build();
    }

    @Test
    public void findAll() throws Exception {
        assertThat(absenceController).isNotNull();
        restAbsenceMockMvc.perform(get("/api/absence"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json;charset=UTF-8"));
    }

    @Test
    public void saveAbsence() throws Exception {
        restAbsenceMockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());

        restAbsenceMockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day2)))
            .andDo(print())
            .andExpect(status().isCreated());
        findAll();
    }


    @Test
    public void getAbsencesByYearAndMonth() throws Exception {
        restAbsenceMockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());

        restAbsenceMockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day2)))
            .andDo(print())
            .andExpect(status().isCreated());

        restAbsenceMockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day3)))
            .andDo(print())
            .andExpect(status().isCreated());

        String regex = "\\[\\{\"id\":\".{24}\",\"year\":2017,\"month\":4,\"day\":23,\"demiJournee\":false\\}\\]";
        restAbsenceMockMvc.perform(get("/api/absence").param("year", "2017").param("month", "04"))
            .andDo(print())
            .andExpect(content().string(new Find(regex)))
            .andExpect(status().isOk()).andReturn();
    }

    @Test
    public void UpdateAbsence() throws Exception {
        restAbsenceMockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());

        day1.setDemiJournee(false);

        restAbsenceMockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());
        findAll();
    }

    @Test
    public void deleteAbsence() throws Exception {
        day1.setId("123");
        restAbsenceMockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());
        restAbsenceMockMvc.perform(delete("/api/absence/123")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isOk());
        findAll();

    }

    @Test
    public void deleteAllAbsences() throws Exception {
        restAbsenceMockMvc.perform(post("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(day1)))
            .andDo(print())
            .andExpect(status().isCreated());

        restAbsenceMockMvc.perform(delete("/api/absence")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes("")))
            .andDo(print())
            .andExpect(status().isOk());

        findAll();

    }


}
