import { Module } from '@nestjs/common';
import { SearchEngineService } from './search-engine.service';
import { SearchEngineController } from './search-engine.controller';
import { SEARCH_ENGINE_INTERFACE } from 'src/constant/providers';

@Module({
  providers: [
        {
                provide: SEARCH_ENGINE_INTERFACE,
                useClass: SearchEngineService
        }
  ],
  controllers: [SearchEngineController]
})
export class SearchEngineModule {}
