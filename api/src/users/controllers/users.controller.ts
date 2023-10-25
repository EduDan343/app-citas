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
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    // @Get('createUsers')
    // createUsers() {
    //     return this.usersService.createAll()
    // }

    @Get()
    async getUsers() {
        const getAllUsers = this.usersService.findAll()
        if ((await getAllUsers).length === 0) {
            return this.usersService.createAll()
        }
        return getAllUsers;
    }

    @Get(':userId')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param('userId', ParseIntPipe) userId: number) {
        return this.usersService.findOne(userId);
    }

    @Post()
    create(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateUserDto
    ) {
        return this.usersService.update(id, payload)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(+id)
    }
}