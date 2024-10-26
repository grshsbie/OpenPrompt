import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class ShareRequestDto {
  @IsString()
  @IsNotEmpty()
  requestId: string;

  @IsArray()
  @IsNotEmpty()
  sharedWith: string[];
}
