import { Controller, Get, Post, Delete } from '@nestjs/common';
import { CountdownsService } from './countdowns.service';

@Controller('countdonws')
export class CountdownsController {
    constructor(private readonly countdownsService: CountdownsService) { }

    @Get()
    findAll() {
        return this.countdownsService.findAll();
    }

    @Post()
    create() {
        return this.countdownsService.create();
    }

    @Delete()
    delete() {
        return this.countdownsService.delete();
    }
}