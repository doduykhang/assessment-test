import { Body, Controller, Delete, Get, Inject, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { SEARCH_ENGINE_INTERFACE } from 'src/constant/providers';
import { NotFoundInterceptor } from 'src/interceptors/NotFoundInterceptor';
import { AddWordRequest } from './dto/add-request-dto';
import { SearchEngine } from './search-engine.interface';

@Controller('search')
@UseInterceptors(NotFoundInterceptor)
export class SearchEngineController {
        constructor(
                @Inject(SEARCH_ENGINE_INTERFACE)
                private readonly searchEngineService: SearchEngine
        ) {}

        @Get()
        search(@Query("query") query: string) {
                return this.searchEngineService.search(query) 
        }

        @Post()
        public add(@Body() request: AddWordRequest) {
                return this.searchEngineService.add(request.word) 
        }

        @Delete("/:word")
        public remove(@Param("word") word: string) {
                return this.searchEngineService.remove(word) 
        }
}
