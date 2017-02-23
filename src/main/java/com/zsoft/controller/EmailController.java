package com.zsoft.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

/**
 * Created by Billel Boudjit on 21/02/2017.
 */
@RestController
public class EmailController {
    public boolean exist = false;
    @RequestMapping("/emails")
    public ArrayList<String> emailList()    {
        ArrayList<String> emails = new ArrayList<String>();
        emails.add("belkacem@gmail.com");
        emails.add("mourad@gmail.com");
        emails.add("billel@gmail.com");
        return(emails);
    }
}
