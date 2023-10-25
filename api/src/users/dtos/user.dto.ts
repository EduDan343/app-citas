import { IsString, IsNotEmpty, IsEmail, Length, IsNumber, IsArray } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly lastname: string;

    @IsNumber()
    @IsNotEmpty()
    readonly phone: number;

    @IsArray()
    readonly citas: object[];

}

export class UpdateUserDto extends PartialType(CreateUserDto) { }