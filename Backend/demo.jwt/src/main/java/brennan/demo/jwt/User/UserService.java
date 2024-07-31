package brennan.demo.jwt.User;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository; 

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {
        //Role role = Role.valueOf(userRequest.getRole().toUpperCase());

        Optional<User> user = this.userRepository.findByUsername(userRequest.getUsername());

        if(user.isPresent()){

            User userUpdated = user.get();
            userUpdated.setFirstname(userRequest.getFirstname());
            userUpdated.setLastname(userRequest.getLastname());
            userUpdated.setCountry(userRequest.getCountry());

            // Update license only if the user is a doctor
            
            userUpdated.setLicense(userRequest.getLicense());
            

            this.userRepository.save(userUpdated); // Save the user
        }

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
            .license(user.license)
            .role(user.role.toString())
            .build();
            return userDTO;
        }
        return null;
    }

    public List<User> getPatients() {
        return this.userRepository.findAllByRole(Role.PATIENT);
    }

    public List<User> getDoctors() {
        return this.userRepository.findAllByRole(Role.DOCTOR);
    }
}