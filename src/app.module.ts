import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig'
import { DriverModule } from './driver/driver.module';
import { CarModule } from './car/car.module';
import { TrackModule } from './track/track.module';
import { RaceEventModule } from './race-event/race-event.module';
import { ChampionshipModule } from './championship/championship.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    DriverModule,
    CarModule,
    TrackModule,
    RaceEventModule,
    ChampionshipModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
