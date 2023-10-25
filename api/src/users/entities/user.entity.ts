import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Calendar } from './calendar.entity';
import { Horario } from './horario.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 50 })
    lastname: string;

    @Column({ type: 'bigint' })
    phone: number;

    @Column({ type: 'json', nullable: true })
    citas: object[]

}