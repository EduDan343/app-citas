import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCalendarDto {
    @IsString()
    @IsNotEmpty()
    readonly fecha: string;
}

export class UpdateCalendarDto extends PartialType(CreateCalendarDto) { }