

package com.archeo.server.modules.user.models;

import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.enums.USER_ROLE;
import com.archeo.server.modules.common.models.UsersCommon;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "owner")
public class Owner {

    @Id
    @GeneratedValue
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name="full_name" , nullable = false, length = 300)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Permission> permissions;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "owner_roles", joinColumns = @JoinColumn(name = "owner_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false)
    private List<USER_ROLE> userRole;


    @Column(name = "dob")
    private LocalDate dob;

    @Column(name="phone_number")
    private String phoneNumber;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UsersCommon user;

    @Column(name = "avatar_url")
    private String avatarUrl;

//    @Column(name="bio")
//    private String bio;

    @Column(name="address")
    private String address;

    @Column(name="profession")
    private String profession;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @CreationTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}
