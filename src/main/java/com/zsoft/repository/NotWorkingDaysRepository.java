package com.zsoft.repository;

import com.zsoft.domain.NotWorkingDays;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface NotWorkingDaysRepository extends MongoRepository<NotWorkingDays,String > {
    public NotWorkingDays findByMonth(String month);
}
