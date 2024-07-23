package brennan.demo.jwt.Auth;


// Esta clase va a dar la respuesta (buena o mala) tano para el login como para el register.

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    String token;
}
