import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Horario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    horario: string;

    @Column({ type: 'varchar', nullable: true })
    lunes: string;

    @Column({ type: 'varchar', nullable: true })
    martes: string;

    @Column({ type: 'varchar', nullable: true })
    miercoles: string;

    @Column({ type: 'varchar', nullable: true })
    jueves: string;

    @Column({ type: 'varchar', nullable: true })
    viernes: string;

    @Column({ type: 'varchar', nullable: true })
    sabado: string;

    @Column({ type: 'varchar', nullable: true })
    domingo: string;
}