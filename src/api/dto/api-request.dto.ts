import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class ApiRequestDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsObject()
  @IsOptional()
  headers?: Record<string, string>;

  @IsObject()
  @IsOptional()
  body?: Record<string, any>;
}
