import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { User } from '../entities/user.entity';
import { Horario } from '../entities/horario.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { usersData } from 'src/data/users.data';

@Injectable()
export class UsersService {
    constructor(
        private configService: ConfigService,
        @Inject('PG') private clientPg: Client,
        @InjectRepository(User) private userRepo: Repository<User>
    ) { }

    findAll() {
        return this.userRepo.find()
    }

    findOne(id: number) {
        const user = this.userRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return user;
    }

    create(data: CreateUserDto) {
        // const parseCitas = JSON.stringify(data.citas).replace('[', '{').replace(']', '}');
        // const parseCitas = data.citas.map(cita => JSON.stringify(cita))
        // console.log({ parseCitas })
        // const parseData = { ...data, citas: parseCitas }
        // console.log({ parseData })
        const newUser = this.userRepo.create(data);

        return this.userRepo.save(newUser);
    }

    createAll() {
        const newUsers = this.userRepo.create(usersData)

        return this.userRepo.save(newUsers);
    }

    async update(id: number, changes: any) {
        const user = await this.findOne(id);
        this.userRepo.merge(user, changes);
        return this.userRepo.save(user);
    }

    remove(id: number) {
        return this.userRepo.delete(id);
    }

    async getDateByUser(id: number) {

    }

    getTasks() {
        return new Promise((resolve, reject) => {
            this.clientPg.query('SELECT * FROM tasks', (err, res) => {
                if (err) {
                    reject(err);
                }
                console.error(err);
                resolve(res.rows);
            });
        })
    }
}