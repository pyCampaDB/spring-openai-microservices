package com.ai.SpringAI.controllers;

import com.ai.SpringAI.services.ImageService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/image-service")
public class GenAIController {
    private final ImageService imageService;

    public GenAIController(ImageService imageService) {
        this.imageService=imageService;
    }


    @GetMapping("/generate-image")
    public void getImages(HttpServletResponse response, @RequestParam String prompt) throws IOException
    {
        ImageResponse imageResponse = imageService.generateImage(prompt);
        String imageUrl = imageResponse.getResult().getOutput().getUrl();
        response.sendRedirect(imageUrl);
    }

    @GetMapping("/generate-image-options")
    public List<String> getImagesOptions(@RequestParam String prompt){
        ImageResponse imageResponse = imageService.generateImageOptions(prompt);
        return imageResponse.getResults().stream().map(
                result -> result.getOutput().getUrl()
        ).toList();
    }

    @GetMapping("/generate-image-options-ii")
    public List<String> getImagesOptionsII(
            @RequestParam String prompt,
            @RequestParam(defaultValue = "dall-e-2") String model,
            @RequestParam(defaultValue = "hd") String quality,
            @RequestParam(defaultValue = "1") String n,
            @RequestParam(defaultValue = "256") String width,
            @RequestParam(defaultValue = "256") String height
    ){
        ImageResponse imageResponse =
                imageService.generateImageOptionsII(
                        prompt, model,quality,n,width,height
                );
        return imageResponse.getResults().stream().map(
                result -> result.getOutput().getUrl()
        ).toList();
    }


}
