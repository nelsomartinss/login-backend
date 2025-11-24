import { Module } from '@nestjs/common';
import { CountdownsService } from './countdowns.service';
import { CountdownsController } from './countdown.controller';

@Module({
  controllers: [CountdownsController],
  providers: [CountdownsService]
})
export class CountdownsModule { }
