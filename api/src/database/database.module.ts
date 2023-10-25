import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule, HttpService } from '@nestjs/axios';
import axios from 'axios';

import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, host, dbName, password, port } = configService.postgres;
                return {
                    type: 'postgres',
                    host,
                    port,
                    username: user,
                    password,
                    database: dbName,
                    synchronize: true,
                    autoLoadEntities: true,
                }
            }
        }),
        HttpModule,
    ],
    providers: [
        {
            provide: 'DATABASExD',
            useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
        },
        {
            provide: 'PG',
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, host, dbName, password, port } = configService.postgres;
                const client = new Client({
                    user,
                    host,
                    database: dbName,
                    password,
                    port
                });

                client.connect();
                return client;

            }, //usefactory permite ejecutar codigo asincrono y hacer inyeccion de dependencias
            inject: [config.KEY]
        },
    ],
    exports: ['DATABASExD', 'PG', TypeOrmModule]
})
export class DatabaseModule { }
