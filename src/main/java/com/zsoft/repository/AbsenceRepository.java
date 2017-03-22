package com.zsoft.repository;

import com.zsoft.domain.Absence;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

/**
 * Created by Billel Boudjit on 21/03/2017.
 */
public interface AbsenceRepository extends MongoRepository<Absence,String> {
        Absence findByYearAndMonthAndDay(Integer year, Integer month,Integer day);
        List<Absence> findByYearAndMonth(Integer year, Integer month);
}
