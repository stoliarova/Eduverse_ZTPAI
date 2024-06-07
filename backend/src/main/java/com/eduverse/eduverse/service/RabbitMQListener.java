package com.eduverse.eduverse.service;

import com.eduverse.eduverse.config.RabbitMQConfig;
import com.eduverse.eduverse.dao.LoginAttemptRepository;
import com.eduverse.eduverse.entity.LoginAttempt;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQListener {

    @Autowired
    private LoginAttemptRepository loginAttemptRepository;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void listen(LoginAttempt loginAttempt) {
        loginAttemptRepository.save(loginAttempt);
    }
}
