package com.ai.SpringAI.controller;

import com.ai.SpringAI.service.ChatService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat-service")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/ask-ai")
    public String getResponse(@RequestParam String prompt){
        return chatService.getResponse(prompt);
    }

    @GetMapping("/ask-ai-options")
    public String getResponseOptions(
            @RequestParam String prompt,
            @RequestParam(defaultValue = "gpt-4o") String model,
            @RequestParam(defaultValue = "0.3F") String temperature,
            @RequestParam(defaultValue = "1897") String tokens
    ){
        return chatService.getResponseOptions(prompt, model, temperature, tokens);
    }

}
