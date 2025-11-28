import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';

import { CountdownsService } from './countdowns.service';
import { CreateCountdownDto } from './dto/create-countdown.dto';
import { UpdateCountdownDto } from './dto/update-countdown.dto'

@Controller('countdonws')
export class CountdownsController {
    constructor(private readonly countdownsService: CountdownsService) { }

    @Post()
    create(@Body() dto: CreateCountdownDto) {
        return this.countdownsService.create(dto);
    }

    @Get()
    findAll() {
        return this.countdownsService.findAll();
    }

    @Get()
    findOne(@Param(':id') id: string) {
        return this.countdownsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDto: UpdateCountdownDto,
    ) {
        return this.countdownsService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.countdownsService.remove(id);
    }
}