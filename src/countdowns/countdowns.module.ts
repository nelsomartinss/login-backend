import { Module } from '@nestjs/common';
import { CountdownsService } from './countdowns.service';

@Module({
  providers: [CountdownsService]
})
export class CountdownsModule {}
