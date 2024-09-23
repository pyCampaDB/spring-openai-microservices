package com.ai.SpringAI.services;

import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    private final OpenAiImageModel openAiImageModel;

    public ImageService(OpenAiImageModel openAiImageModel) {
        this.openAiImageModel = openAiImageModel;
    }

    public ImageResponse generateImage(String prompt){
        return openAiImageModel.call(new ImagePrompt(prompt));
    }

    public ImageResponse generateImageOptions(String prompt){
        return openAiImageModel.call(
                new ImagePrompt(prompt,
                        OpenAiImageOptions.builder()
                                .withModel("dall-e-2")
                                .withQuality("hd")
                                .withN(3)
                                .withHeight(512)
                                .withWidth(512).build())

        );
    }

    public ImageResponse generateImageOptionsII(
            String prompt,
            String model,
            String quality,
            String n,
            String width,
            String height
    ){
        return openAiImageModel.call(
                new ImagePrompt(prompt,
                        OpenAiImageOptions.builder()
                                .withModel(model)
                                .withQuality(quality)
                                .withN(Integer.valueOf(n))
                                .withHeight(Integer.valueOf(height))
                                .withWidth(Integer.valueOf(width)).build())

        );
    }
}
