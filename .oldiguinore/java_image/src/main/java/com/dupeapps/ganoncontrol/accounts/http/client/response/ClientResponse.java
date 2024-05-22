package com.dupeapps.ganoncontrol.accounts.http.client.response;

import com.dupeapps.ganoncontrol.accounts.domain.client.Client;

import java.util.ArrayList;
import java.util.List;
public class ClientResponse {
    
    private ClientResponse(){}

    public static List<ClientListItem> getAllClientsResponse(List<Client> cl) {
        List<ClientListItem> l = new ArrayList<>();
        for (Client c : cl) {
            ClientListItem li = new ClientListItem();
            li.parse(c);
            l.add(li);
        }
        return l;
    }
}
