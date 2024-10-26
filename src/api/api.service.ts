import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ApiRequestDto } from './dto/api-request.dto';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class ApiService {
  private openai: OpenAIApi;

  constructor(private readonly httpService: HttpService) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async makeRequest(apiRequestDto: ApiRequestDto): Promise<any> {
    const { url, method, headers, body } = apiRequestDto;
    try {
      const response = await lastValueFrom(
        this.httpService.request({
          url,
          method,
          headers,
          data: body,
        }),
      );
      const analysis = await this.analyzeWithFunctionCalling(response.data);
      return {
        apiResponse: response.data,
        openAIAnalysis: analysis,
      };
    } catch (error) {
      throw new Error(`Error making request to ${url}: ${error.message}`);
    }
  }

  async analyzeWithFunctionCalling(apiResponse: any): Promise<any> {
    try {
      const prompt = `Analyze the following API response and provide insights or recommendations: ${JSON.stringify(apiResponse)}`;

      const functionDescriptions = [
        {
          name: "extract_user_info",
          description: "Extract user-related information from the API response",
          parameters: {
            type: "object",
            properties: {
              userId: {
                type: "integer",
                description: "The user ID of the user",
              },
              name: {
                type: "string",
                description: "The name of the user",
              },
              email: {
                type: "string",
                description: "The email of the user",
              },
            },
            required: ["userId"],
          },
        },
      ];

      const openaiResponse = await this.openai.createChatCompletion({
        model: 'gpt-4-0613',
        messages: [
          {
            role: 'system',
            content: 'You are an assistant that analyzes API responses and calls functions based on the data.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        functions: functionDescriptions,
        function_call: "auto",
      });

      const calledFunction = openaiResponse.data.choices[0].message?.function_call;
      if (calledFunction) {
        return {
          analysis: calledFunction.arguments,
          functionCalled: calledFunction.name,
        };
      }

      return openaiResponse.data.choices[0].message?.content;
    } catch (error) {
      throw new Error(`Error analyzing response with OpenAI function calling: ${error.message}`);
    }
  }
}
