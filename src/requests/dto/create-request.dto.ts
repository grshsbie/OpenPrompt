import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsObject()
  @IsOptional()
  headers?: Record<string, any>;

  @IsObject()
  @IsOptional()
  body?: Record<string, any>;
}
