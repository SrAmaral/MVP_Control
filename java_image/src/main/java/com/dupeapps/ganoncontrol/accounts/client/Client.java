package com.dupeapps.ganoncontrol.accounts.client;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "clients")
@Data
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String location;

    private String site;

    private String description;

    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(name = "is_client")
    private boolean isClient;

    @Column(name = "dock_id")
    private Long dockId;

    private String files;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_visit")
    private Date lastVisit;
}
