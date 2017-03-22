package com.zsoft.web.rest;


import com.zsoft.domain.Absence;
import com.zsoft.repository.AbsenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AbsenceController {

    @Autowired
    private AbsenceRepository absenceRepository;


    public AbsenceController(AbsenceRepository absenceRepository) {
        this.absenceRepository = absenceRepository;
    }

    @GetMapping("/absence")
    public List<Absence> getAllAbsences() {
        return absenceRepository.findAll();
    }

    @GetMapping(value = "/absence", params = {"year", "month"})
    public List<Absence> getAllAbsencesByYearAndMonth(@RequestParam(value = "year") Integer year, @RequestParam(value = "month") Integer month) {
        return absenceRepository.findByYearAndMonth(year, month);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/absence")
    public Absence createAbsence(@Valid @RequestBody Absence absence) {
        Absence existingAbsence = absenceRepository.findByYearAndMonthAndDay(absence.year, absence.month, absence.day);
        if (existingAbsence == null) {
            return absenceRepository.save(absence);
        } else {
            existingAbsence.demiJournee = absence.demiJournee;
            return absenceRepository.save(existingAbsence);
        }
    }

    @DeleteMapping("/absence/{id}")
    public void deleteAbsence(@PathVariable("id") String id) {
        absenceRepository.delete(id);
    }

    @DeleteMapping("/absence")
    public void deleteAllAbsences() {
        absenceRepository.deleteAll();
    }
}
