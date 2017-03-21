package com.zsoft.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document
public class Absence {

    @Id
    public String id;
    public LocalDate date;
    public Boolean demiJournee;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Boolean getDemiJournee() {
        return demiJournee;
    }

    public void setDemiJournee(Boolean demiJournee) {
        this.demiJournee = demiJournee;
    }

    public Absence(LocalDate date, Boolean demiJournee) {

        this.date = date;
        this.demiJournee = demiJournee;
    }

    public Absence() {

    }

    @Override
    public String toString() {
        return String.format("Absence [id=%s, date='%s', demi Journée ='%s']", id, date, demiJournee);
    }

}
