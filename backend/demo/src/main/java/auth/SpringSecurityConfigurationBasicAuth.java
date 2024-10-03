package com.example.demo.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfigurationBasicAuth{

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //1: Response to preflight request doesn't pass access control check
        //2: basic auth
        RequestMatcher optionsMatcher = new AntPathRequestMatcher("/**", HttpMethod.OPTIONS.toString());
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers(optionsMatcher).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/**")).authenticated());

        http.csrf(csrf -> csrf.disable());

        http.httpBasic(withDefaults());

        return http.build();
    }
}
