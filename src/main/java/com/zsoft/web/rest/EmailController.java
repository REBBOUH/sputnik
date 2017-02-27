package com.zsoft.web.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import static org.springframework.http.MediaType.*;

/**
 * Created by Billel Boudjit on 21/02/2017.
 */
@RestController
public class EmailController {
    @RequestMapping(value="/emails",
        produces={APPLICATION_JSON_VALUE, TEXT_PLAIN_VALUE})
    public ArrayList<String> emailList()    {
        ArrayList<String> emails = new ArrayList<String>();
        emails.add("belkacem@gmail.com");
        emails.add("mourad@gmail.com");
        emails.add("billel@gmail.com");
        return(emails);
    }
}
