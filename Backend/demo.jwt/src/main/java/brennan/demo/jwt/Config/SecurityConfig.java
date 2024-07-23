package brennan.demo.jwt.Config;

import brennan.demo.jwt.Jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .csrf(csrf -> csrf.disable()) // Deshabilita la protección CSRF
                .authorizeHttpRequests(authRequest -> authRequest
                        .requestMatchers(HttpMethod.GET).permitAll()  //Permite el uso de los métodos GET a todos.
                        .requestMatchers(HttpMethod.OPTIONS).permitAll() //Permite el uso de los métodos OPTIONS a todos. Cuando una solicitud HTTP se realiza desde un origen diferente (por ejemplo, desde un dominio diferente), los navegadores pueden enviar una solicitud OPTIONS previa para determinar si el servidor permite la solicitud real.
                        .requestMatchers("/auth/**").permitAll() //Permite todas las solicitudes a rutas que comiencen con /auth/
                        .anyRequest().authenticated() // Requiere autenticación para cualquier otra solicitud
                )
                //.formLogin(withDefaults()) // Habilita el inicio de sesión con formulario usando la configuración predeterminada de Spring Security
                .sessionManagement(sessionManager ->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build(); // Construye y devuelve el SecurityFilterChain
    }
}
