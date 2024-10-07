package com.springsecurity.SpringSecurity.basic;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
@EnableMethodSecurity(jsr250Enabled = true)
public class BasicAuthSecurityConfiguration {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
                auth -> {
                    auth
                            .requestMatchers("/users").hasRole("USERS")
                            .requestMatchers("/admin/**").hasRole("ADMIN")
                            .anyRequest()
                            .authenticated();
                }
        );
        // http.formLogin();
        http.sessionManagement(
                session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );
        http.httpBasic();
        http.csrf().disable();
        http.headers().frameOptions().sameOrigin();
        return http.build();
    }

    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .addScript(JdbcDaoImpl.DEFAULT_USER_SCHEMA_DDL_LOCATION)
                .build();
    }

    // @Bean
    // public UserDetailsService userDetailsService() {
    //     var user = User.withUsername("suhail")
    //             .password("{noop}abc")
    //             .roles("USER")
    //             .build();
    //
    //     var admin = User.withUsername("admin")
    //             .password("{noop}admin")
    //             .roles("ADMIN")
    //             .build();
    //
    //     return new InMemoryUserDetailsManager(user, admin);
    // }

    @Bean
    public UserDetailsService userDetailsService(DataSource dataSource) {
        var user = User.withUsername("suhail")
                // .password("{noop}abc")
                .passwordEncoder(str -> passwordEncoder().encode("abc"))
                .roles("USER")
                .build();

        var admin = User.withUsername("admin")
                // .password("{noop}admin")
                .passwordEncoder(str -> passwordEncoder().encode("admin"))
                .roles("ADMIN", "USER")
                .build();

        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
        jdbcUserDetailsManager.createUser(user);
        jdbcUserDetailsManager.createUser(admin);

        return jdbcUserDetailsManager;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
