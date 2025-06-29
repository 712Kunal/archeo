package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.models.AuthLogs;
import com.archeo.server.modules.auth.repositories.AuthLogsRepo;
import com.archeo.server.modules.common.models.UsersCommon;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthLogsService {

    private final AuthLogsRepo authLogsRepo;
    private final PasswordEncoder passwordEncoder;

    public void log(UsersCommon user, String refreshToken, HttpServletRequest request){

        AuthLogs authLogs=AuthLogs.builder()
                .usersCommon(user)
                .refreshTokenHash(passwordEncoder.encode(refreshToken))
                .ipAddress(request.getRemoteAddr())
                .userAgent(request.getHeader("User-Agent"))
                .build();

        authLogsRepo.save(authLogs);
    }
}
