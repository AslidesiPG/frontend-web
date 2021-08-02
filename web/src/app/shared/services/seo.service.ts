import { Injectable} from '@angular/core';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    constructor(
        private meta: Meta,
        private titile: Title
    ){}

    setDescription(description: string) {
        this.meta.updateTag({
            content: description,
            name: 'description'
        }, `name="description"`)
    }

    setKeywords(keywords: string) {
        this.meta.updateTag({
            content: keywords,
            name: 'keywords'
        }, `name="keywords"`)
    }

    setTitle(title: string) {
        this.titile.setTitle(title);
    }
}
