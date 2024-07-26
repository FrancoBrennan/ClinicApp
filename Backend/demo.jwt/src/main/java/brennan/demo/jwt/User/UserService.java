package brennan.demo.jwt.User;

import java.util.List;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository; 

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {
        Role role = Role.valueOf(userRequest.getRole().toUpperCase());

        User user = User.builder()
        .id(userRequest.id)
        .firstname(userRequest.getFirstname())
        .lastname(userRequest.lastname)
        .country(userRequest.getCountry())
        .license(userRequest.getLicense())
        .role(role)
        .build();
        
        userRepository.updateUser(user.id, user.firstname, user.lastname, user.country, user.license);

        return new UserResponse("El usuario se modificó satisfactoriamente");
    }

    public UserDTO getUser(Integer id) {
        User user= userRepository.findById(id).orElse(null);
       
        if (user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
            .id(user.id)
            .username(user.username)
            .firstname(user.firstname)
            .lastname(user.lastname)
            .country(user.country)
            .license(user.getLicense())
            .role(user.role.toString())
            .build();
            return userDTO;
        }
        return null;
    }

    public UserDTO getUser(String username) {
        User user= userRepository.findByUsername(username).orElse(null);
       
        if (user!=null)
        {

            UserDTO userDTO = UserDTO.builder()
            .id(user.id)
            .username(user.username)
            .firstname(user.firstname)
            .lastname(user.lastname)
            .country(user.country)
            .license(user.getLicense())
            .role(user.role.toString())
            .build();
            return userDTO;
        }
        return null;
    }

    public List<User> getPatients() {
        return this.userRepository.findAllByRole(Role.PATIENT);
    }
}