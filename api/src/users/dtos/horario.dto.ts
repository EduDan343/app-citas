import { IsString, IsNotEmpty, IsEmail, Length, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateHorarioDto {
    @IsString()
    @IsNotEmpty()
    readonly horario: string;
}

export class UpdateHorarioDto extends PartialType(CreateHorarioDto) { }