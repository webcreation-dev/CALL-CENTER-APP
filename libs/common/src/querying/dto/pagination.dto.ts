import { IsCardinal } from '@app/common/usual/decorators/validators/is-cardinal.decorator';
import { IsOptional, Max } from 'class-validator';
import { MAX_PAGE_NUMBER, MAX_PAGE_SIZE } from '../util/querying.constants';

export class PaginationDto {
  @Max(MAX_PAGE_SIZE)
  @IsOptional()
  @IsCardinal()
  readonly limit?: number;

  @Max(MAX_PAGE_NUMBER)
  @IsOptional()
  @IsCardinal()
  readonly page?: number = 1;
}
