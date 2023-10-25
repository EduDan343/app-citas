import {
    Controller,
    Get,
    Query,
    Param,
    Post,
    Body,
    Put,
    Delete,
    HttpStatus,
    HttpCode,
    Res,
    // ParseIntPipe,
} from '@nestjs/common';

import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { HorariosService } from '../services/horarios.service';
import { CreateHorarioDto, UpdateHorarioDto } from '../dtos/horario.dto';

@Controller('horarios')
export class HorariosController {
    constructor(private horariosService: HorariosService) { }

    @Get()
    async getHorarios() {
        const getAllHorarios = this.horariosService.findAll();
        if ((await getAllHorarios).length === 0) {
            return this.horariosService.createAll();
        }
        return this.horariosService.findAll()
    }

    @Get(':horarioId')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param('horarioId', ParseIntPipe) horarioId: number) {
        return this.horariosService.findOne(horarioId);
    }

    @Post()
    create(@Body() payload: CreateHorarioDto) {
        return this.horariosService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateHorarioDto
    ) {
        return this.horariosService.update(id, payload)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.horariosService.remove(+id)
    }
}