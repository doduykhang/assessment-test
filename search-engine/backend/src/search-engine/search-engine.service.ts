import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { join } from 'path';
import { AddWordResult } from './dto/add-result-dto';
import { RemoveWordResult } from './dto/remove-result-dto';
import * as fs from 'fs/promises'
import { SearchEngine } from './search-engine.interface';
import { NotFoundError } from 'src/errors/NotFoundError';

@Injectable()
export class SearchEngineService implements SearchEngine {
        redis = new Redis({
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT)
        });

        constructor() {
                this.initModule()
        }

        private async initModule() {
                // get words from text
                const data = await fs.readFile(join(process.cwd(), './hemingway.txt'), { encoding: 'utf8' }) as string; 
                const words = data.replace(/(\r\n|\n|\r)/gm, "").split(" ")
                
                //add word to redis 
                const addWordPromises = words.map((word) => this.add(word))
                await Promise.all(addWordPromises)
        }


        public async search(query: string): Promise<string[]> {
                const result = await this.redis.call('FT.SUGGET', ['completer', query, "FUZZY"]) as string[]
                return result
        }

        public async add(word: string): Promise<AddWordResult> {
                await this.redis.call('FT.SUGADD', ['completer', word, "1"])
                return {
                        message: "ok"
                }
        }

        public async remove(word: string): Promise<RemoveWordResult> {
                const result = await this.search(word)
                if (result.length) {
                        word = result[0]
                } else {
                        throw new NotFoundError("No matching word")
                }
                await this.redis.call('FT.SUGDEL', ['completer', word])
                return {
                        message: "ok",
                        removedWord: word
                }
        } }
