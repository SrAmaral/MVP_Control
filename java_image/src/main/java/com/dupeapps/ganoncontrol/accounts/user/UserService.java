package com.dupeapps.ganoncontrol.accounts.user;

import com.dupeapps.ganoncontrol.accounts.user.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User createUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
}

