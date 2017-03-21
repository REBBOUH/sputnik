package com.zsoft.web.rest;

import com.zsoft.SputnikApp;
import com.zsoft.domain.NotWorkingDays;
import com.zsoft.repository.NotWorkingDaysRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringRunner.class)
@EnableAutoConfiguration
@SpringBootTest(classes = SputnikApp.class)
public class NotWorkingDaysTest {
    private final Logger log = LoggerFactory.getLogger(NotWorkingDaysTest.class);

    @Autowired
    NotWorkingDaysRepository notWorkingDaysRepository;
    NotWorkingDays day1, day2;

    @Before
    public void setUp() {
        day2 = notWorkingDaysRepository.save(new NotWorkingDays("01", "02,08,22"));
        day1 = notWorkingDaysRepository.save(new NotWorkingDays("02", "01"));
    }

    @Test
    public void setsIdOnSave() {
        NotWorkingDays day = notWorkingDaysRepository.save(new NotWorkingDays("00", "01"));
        assertThat(day.id).isNotNull();
        log.info("-----------------------------------<TEST>----------------------------------------");
        log.info("NotWorkingDays.id : " + day.id);
        log.info("-----------------------------------</TEST>----------------------------------------");
    }

    @Test
    public void findAllNotWorkingDays() {
        List<NotWorkingDays> notWorkingDays = notWorkingDaysRepository.findAll();
        assertThat(notWorkingDays).hasSize(2).extracting("month").contains("01");
        log.info("-----------------------------------<TEST>----------------------------------------");
        for (NotWorkingDays notWorkingDay : notWorkingDays) {
            log.info("result : " + notWorkingDays);
        }
        log.info("-----------------------------------</TEST>----------------------------------------");
    }

    @Test
    public void findByMonth() {
        NotWorkingDays result = notWorkingDaysRepository.findByMonth("01");
        assertThat(result.days.equals("02,08,22"));
        log.info("-----------------------------------<TEST>----------------------------------------");
        log.info("Month 01 : " + result);
        log.info("-----------------------------------</TEST>----------------------------------------");
    }
}
