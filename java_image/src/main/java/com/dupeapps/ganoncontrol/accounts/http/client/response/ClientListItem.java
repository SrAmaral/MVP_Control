package com.dupeapps.ganoncontrol.accounts.http.client.response;

import com.dupeapps.ganoncontrol.accounts.domain.client.Client;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@AllArgsConstructor
public class ClientListItem {
    public Long id;
    public String name;
    public String location;
    public String site;
    public String description;
    public String contactEmail;
    public String contactNumber;
    public boolean isClient;
    public Long dockId;
    public String files;
    public Date createdAt;
    public Date updatedAt;
    public Date lastVisit;

    protected ClientListItem() {
    }

    public ClientListItem parse(Client c) {
        this.id = c.getId();
        this.name = c.getName();
        this.location = c.getLocation();
        this.site = c.getSite();
        this.description = c.getDescription();
        this.contactEmail = c.getContactEmail();
        this.contactNumber = c.getContactNumber();
        this.isClient = c.isClient();
        this.dockId = c.getDockId();
        this.files = c.getFiles();
        this.createdAt = c.getCreatedAt();
        this.updatedAt = c.getUpdatedAt();
        this.lastVisit = c.getLastVisit();
        return this;
    }
}
