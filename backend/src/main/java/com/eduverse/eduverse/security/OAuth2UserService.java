//package com.eduverse.eduverse.security;
//
//import com.eduverse.eduverse.entity.User;
//import com.eduverse.eduverse.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import java.util.Map;
//import java.util.Optional;
//
//@Service
//public class OAuth2UserService extends DefaultOAuth2UserService {
//
//    private UserService userService;
//
//    @Autowired
//    public OAuth2UserService(UserService pUserService){
//        userService = pUserService;
//    }
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
//        OAuth2User user = super.loadUser(userRequest);
//
//        Map<String, Object> attributes = user.getAttributes();
//
//        String email = (String)attributes.get("email");
//
//        // Check if there are users with such email in DB
//        var dbUsers = userService.findBy("email", email);
//
//        // if there are no such users - create one using Auth provider data
//        if (dbUsers.isEmpty()){
//            User newUser = new User();
//            newUser.setEmail(email);
//            newUser.setProvider(userRequest.getClientRegistration().getRegistrationId());
//            userService.save(newUser);
//        }
//
//        return user;
//
//
//    }
//}
