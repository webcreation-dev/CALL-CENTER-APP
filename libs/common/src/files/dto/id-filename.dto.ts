import { IdDto } from '@app/common/usual/dto/id.dto';
import { FilenameDto } from './filename.dto';
import { IntersectionType } from '@nestjs/swagger';

export class IdFilenameDto extends IntersectionType(IdDto, FilenameDto) {}
