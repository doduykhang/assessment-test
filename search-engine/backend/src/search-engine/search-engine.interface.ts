import { AddWordResult } from "./dto/add-result-dto"
import { RemoveWordResult } from "./dto/remove-result-dto"

export interface SearchEngine {
        search(query: string): Promise<string[]> 
        add(word: string): Promise<AddWordResult> 
        remove(word: string): Promise<RemoveWordResult> 
}
