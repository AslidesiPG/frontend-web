import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
export * from './helper';

export function toParams(query) {
    let params: HttpParams = new HttpParams();
    Object.keys(query).map((key) => {
        if (isJsObject(query[key])) {
            params = toSubParams(params, key, query[key]);
        } else {
            params = params.append(key.toString(), query[key]);
        }
    });
    return params;
}

function toSubParams(params: HttpParams, key: string, object: any) {
    Object.keys(object).map((childKey) => {
        if (isJsObject(object[childKey])) {
            params = toSubParams(params, `${key}[${childKey}]`, object[childKey]);
        } else {
            params = params.append(`${key}[${childKey}]`, object[childKey]);
        }
    });

    return params;
}


export function toFormData(obj: any, form?: any, namespace?: any) {
    const fd = form || new FormData();
    let formKey;

    for (const property in obj) {
        if (obj.hasOwnProperty(property) && obj[property]) {
            if (namespace) {
                formKey = namespace + '[' + property + ']';
            } else {
                formKey = property;
            }

            // if the property is an object, but not a File, use recursivity.
            if (obj[property] instanceof Date) {
                fd.append(formKey, obj[property].toISOString());
            } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                toFormData(obj[property], fd, formKey);
            } else { // if it's a string or a File object
                fd.append(formKey, obj[property]);
            }
        }
    }

    return fd;
}


export function apiUrl(path?: string) {
    return environment.apiUrl.replace(/(^\/)|(\/$)/g, '') + '/' + path.replace(/(^\/)|(\/$)/g, '');
}


export function fileUrl(path?: string) {
    if (!path || path.startsWith('http')) {
        return path;
    }
    return environment.apiUrl ? environment.apiUrl.replace(/(^\/)|(\/$)/g, '') + '/' + path.replace(/(^\/)|(\/$)/g, '') : path;
}


export function objectToParams(object: any): string {
    return Object.keys(object).map((key) => {
        if (isJsObject(object[key])) {
            return subObjectToParams(encodeURIComponent(key), object[key]);
        } else {
            if (object[key] != null) {
                return `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`;
            } else {
                return `${encodeURIComponent(key)}=`;
            }
        }
    }
    ).join('&');
}

export function subObjectToParams(key: any, object: any): string {
    return Object.keys(object).map((childKey) => {

        if (isJsObject(object[childKey])) {
            return subObjectToParams(`${key}[${encodeURIComponent(childKey)}]`, object[childKey]);
        } else {
            return `${key}[${encodeURIComponent(childKey)}]=${encodeURIComponent(object[childKey])}`;
        }
    }
    ).join('&');
}

export function isJsObject(object: any) {
    const type: string = typeof object;
    return object && (type === 'object');
}


export function getTitle(title?: string): string {
    const text: any[] = [];
    if (title) {
        text.push(title);
    }
    text.push('Aslidesi: India\'s Own Online Desi Market Place');
    return text.join(' - ');
}


export function isEmpty(title: any):boolean {
   if(title instanceof Array){
       return title.length === 0;
   } else if (title && typeof title === 'object'){
       return Object.keys(title).length === 0
   }else{
       return !title || (title + '').toLowerCase() === 'null' || (title + '').toLowerCase() === 'undefined';
   }
}



export function getVideoThumb(file: File | Blob) {
    let imageData;
    return new Promise((resolve, reject) => {
        const snapImage = (blob, video) => {
            const url = URL.createObjectURL(blob);
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const image = canvas.toDataURL('image/png');
            const success = image.length > 1000;
            imageData = image;
            return success;
        };

        const readBlogImage = (blob) => {
            const url = URL.createObjectURL(blob);
            const video = document.createElement('video');
            const timeupdate = () => {
                if (snapImage(blob, video)) {
                    video.removeEventListener('timeupdate', timeupdate);
                    video.pause();
                    resolve(imageData);
                }
            };
            video.addEventListener('loadeddata', () => {
                if (snapImage(blob, video)) {
                    video.removeEventListener('timeupdate', timeupdate);
                    resolve(imageData);
                }
            });

            video.addEventListener('timeupdate', timeupdate);
            video.preload = 'metadata';
            video.src = url;
            // Load video in Safari / IE11
            video.muted = true;
            // video.playsInline = true;
            video.play();
        };

        if (file instanceof File) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const blob = new Blob([fileReader.result], { type: file.type });
                readBlogImage(blob);
            };
            fileReader.readAsArrayBuffer(file);
        } else {
            readBlogImage(file);
        }
    });
}
