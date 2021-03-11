import { IsNotEmpty } from 'class-validator';

export class ParamsDTO {
  @IsNotEmpty()
  id: string;
}
