package com.eduverse.eduverse.service;

import com.eduverse.eduverse.config.RabbitMQConfig;
import com.eduverse.eduverse.entity.LoginAttempt;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQSender {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendLoginAttempt(LoginAttempt attempt) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY, attempt);
    }
}
