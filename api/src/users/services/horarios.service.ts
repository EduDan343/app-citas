import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { Horario } from '../entities/horario.entity';
import { CreateHorarioDto, UpdateHorarioDto } from '../dtos/horario.dto';

import { horariosData } from 'src/data/horarios.data';

@Injectable()
export class HorariosService {
    constructor(
        @InjectRepository(Horario) private horarioRepo: Repository<Horario>
    ) { }

    findAll() {
        return this.horarioRepo.find()
    }

    findOne(id: number) {
        const horario = this.horarioRepo.findOneBy({ id });
        if (!horario) {
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return horario;
    }

    create(data: CreateHorarioDto) {
        const newHorario = this.horarioRepo.create(data);

        return this.horarioRepo.save(newHorario);
    }

    createAll() {
        const createNewHorarios = this.horarioRepo.create(horariosData);

        return this.horarioRepo.save(createNewHorarios);
    }

    async update(id: number, changes: any) {
        const user = await this.findOne(id);
        this.horarioRepo.merge(user, changes);
        return this.horarioRepo.save(user);
    }

    remove(id: number) {
        return this.horarioRepo.delete(id);
    }

    async getDateByUser(id: number) {

    }

}