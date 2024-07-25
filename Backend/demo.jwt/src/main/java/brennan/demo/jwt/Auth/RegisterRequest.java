package brennan.demo.jwt.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//Esta clase es la que se ingresan los datos paa el registro.

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    String username;
    String password;
    String firstName;
    String lastName;
    String country;
    String license;
    String role;
    

    
}
