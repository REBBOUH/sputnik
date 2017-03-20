package com.zsoft.web.rest;

import com.zsoft.domain.NotWorkingDays;
import com.zsoft.repository.NotWorkingDaysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NotWorkingDaysController {

    @Autowired
    private NotWorkingDaysRepository notWorkingDaysRepository;

    public NotWorkingDaysController(NotWorkingDaysRepository notWorkingDaysRepository) {
        this.notWorkingDaysRepository = notWorkingDaysRepository;
    }

    @GetMapping("/notWorkingDays")
    public List<NotWorkingDays> getAllNotWorkingDays() {
        return notWorkingDaysRepository.findAll();
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/notWorkingDays")
    public NotWorkingDays createNotWorkingDays(@Valid @RequestBody NotWorkingDays notWorkingDays) {
        NotWorkingDays existingNotWorkingDay = notWorkingDaysRepository.findByMonth(notWorkingDays.month);
        if (existingNotWorkingDay == null) {
            return notWorkingDaysRepository.save(notWorkingDays);
        } else {
            existingNotWorkingDay.days = notWorkingDays.days;
            existingNotWorkingDay.month = notWorkingDays.month;
            return notWorkingDaysRepository.save(existingNotWorkingDay);
        }
    }

    @DeleteMapping("/notWorkingDays/{id}")
    public void deleteNotWorkingDays(@PathVariable("id") String id) {
        notWorkingDaysRepository.delete(id);
    }

    @DeleteMapping("/notWorkingDays")
    public void deleteAllNotWorkingDays() {
        notWorkingDaysRepository.deleteAll();
    }

}
