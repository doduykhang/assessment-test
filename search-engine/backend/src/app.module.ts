import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchEngineModule } from './search-engine/search-engine.module';

@Module({
  imports: [SearchEngineModule],
  providers: [AppService],
})
export class AppModule {}
