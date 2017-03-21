package com.zsoft.repository;

import com.zsoft.domain.Absence;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;

/**
 * Created by Billel Boudjit on 21/03/2017.
 */
public interface AbsenceRepository extends MongoRepository<Absence,String> {
    public Absence findByDate(LocalDate date);
}
