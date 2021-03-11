import { IsNotEmpty } from 'class-validator';

export class QueryParamsDTO {
  @IsNotEmpty()
  search: string;
}
