import { Pipe, PipeTransform, VERSION, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Pipe({ name: 'updateanchor' })
export class UpdateAnchor implements PipeTransform {
    transform(value: any) {
        if (value !== undefined && value !== null && value !== '') {
            return value.replace(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g, (anchor) => {
                if (anchor !== undefined && anchor !== null) {
                    return anchor.replace(/href="(.*?)"/, (m, $1) => {
                        if ($1.indexOf('http') < 0) {
                            // return "[routerLink]=\"['/our-work']\"";
                            return 'href="' + environment.baseUrl + $1 + '" ';
                        } else {
                            return 'href="' + $1 + '"';
                        }
                    });
                }
            });
        }
    }
}

@Pipe({
    name: 'truncate'
})

export class TruncatePipe implements PipeTransform {

    transform(value: string, limit: any = 25, trail: any = '...'): string {
        if (!value) {
            return '';
        }
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}


@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}


@Pipe({
    name: 'nl2br'
})
export class Nl2BrPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {
    }

    transform(value: string, sanitizeBeforehand?: boolean): string {
        if (typeof value !== 'string') {
            return value;
        }
        let result: any;
        const textParsed = value.replace(/(?:\r\n|\r|\n)/g, '<br />');

        if (!VERSION || VERSION.major === '2') {
            result = this.sanitizer.bypassSecurityTrustHtml(textParsed);
        } else if (sanitizeBeforehand) {
            result = this.sanitizer.sanitize(SecurityContext.HTML, textParsed);
        } else {
            result = textParsed;
        }

        return result;
    }

}
