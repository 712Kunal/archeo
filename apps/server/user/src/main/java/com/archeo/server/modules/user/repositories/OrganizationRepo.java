package com.archeo.server.modules.user.repositories;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.user.models.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface OrganizationRepo extends JpaRepository<Organization, UUID> {


    @Query("SELECT o FROM Organization o WHERE o.user.email = :email")
    Optional<Organization> findByUserEmail(@Param("email") String email);

    Optional<Organization> findByUser(UsersCommon user);

    boolean existsByUser(UsersCommon user);
}
