import { Module } from '@nestjs/common';
import { RaceEventController } from './race-event.controller';
import { RaceEventService } from './race-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceEvent } from './entity/race-event.entity';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RaceEvent]),
    TrackModule
  ],
  controllers: [RaceEventController],
  providers: [RaceEventService],
})
export class RaceEventModule {}
