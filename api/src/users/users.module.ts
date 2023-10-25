import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { HorariosController } from './controllers/horarios.controller';
import { HorariosService } from './services/horarios.service';

import { User } from './entities/user.entity';
import { Horario } from './entities/horario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Horario])
    ],
    controllers: [UsersController, HorariosController],
    providers: [UsersService, HorariosService],
    exports: [UsersService, HorariosService]
})
export class UsersModule { }
