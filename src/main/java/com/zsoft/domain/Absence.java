package com.zsoft.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Absence {

    @Id
    public String id;
    public Integer year;
    public Integer month;
    public Integer day;
    public Boolean demiJournee;


    public Absence(Integer year, Integer month, Integer day, Boolean demiJournee) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.demiJournee = demiJournee;
    }

    public Absence() {
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public Boolean getDemiJournee() {
        return demiJournee;
    }

    public void setDemiJournee(Boolean demiJournee) {
        this.demiJournee = demiJournee;
    }

    @Override
    public String toString() {
        return String.format("Absence [id=%s, year='%s', month='%s', day='%s', demi Journée ='%s']",
            id, year, month, day, demiJournee);
    }

}
