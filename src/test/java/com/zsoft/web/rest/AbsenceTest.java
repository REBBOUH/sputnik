package com.zsoft.web.rest;

import com.zsoft.SputnikApp;
import com.zsoft.domain.Absence;
import com.zsoft.repository.AbsenceRepository;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringRunner.class)
@EnableAutoConfiguration
@SpringBootTest(classes = SputnikApp.class)
public class AbsenceTest {

    private final Logger log = LoggerFactory.getLogger(AbsenceTest.class);

    @Autowired
    AbsenceRepository absenceRepository;
    Absence day1, day2;

    @Before
    public void setUp() {
        absenceRepository.deleteAll();
        day2 = absenceRepository.save(new Absence(LocalDate.now(), false));
        day1 = absenceRepository.save(new Absence(LocalDate.of(2017, 03, 22), true));
    }

    @Test
    public void setsIdOnSave() {
        Absence day = absenceRepository.save(new Absence(LocalDate.now(), false));
        assertThat(day.id).isNotNull();
        log.info("-----------------------------------<TEST>----------------------------------------");
        log.info("Absence.id : " + day.id);
        log.info("-----------------------------------</TEST>----------------------------------------");
    }

    @Test
    public void findAllAbsences() {
        List<Absence> absences = absenceRepository.findAll();
        assertThat(absences).hasSize(2).extracting("demiJournee").contains(false);
        log.info("-----------------------------------<TEST>----------------------------------------");
        for (Absence absence : absences) {
            log.info("result : " + absence.toString());
        }
        log.info("-----------------------------------</TEST>----------------------------------------");
    }

    @Test
    public void findByDate() {
        Absence absence = absenceRepository.findByDate(LocalDate.now());
        assertThat(absence.demiJournee.equals(false));
        log.info("-----------------------------------<TEST>----------------------------------------");
        log.info("Absence By Date : " + absence.toString());
        log.info("-----------------------------------</TEST>----------------------------------------");
    }

    @Test
    public void equalsVerifier() throws Exception {
        Assertions.assertThat(day1).isNotEqualTo(day2);
    }
}
