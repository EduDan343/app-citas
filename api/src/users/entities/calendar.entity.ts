import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Calendar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    mes: string;

    @Column({ type: 'int' })
    dia: number

    @Column({ type: 'varchar' })
    hora: string;

}