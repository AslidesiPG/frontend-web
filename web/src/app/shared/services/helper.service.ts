import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isJsObject } from '@utils';
import { ToastyConfig, ToastyService } from 'src/packages/ngx-toasty';


@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor(
        public router: Router,
        public toastyService: ToastyService,
        public toastyConfig: ToastyConfig,
    ) {

    }

    successMessage(data: any, message: any = 'Success') {
        if (data.message !== undefined) {
            this.addToast(data.message, 'Success!', 'success');
        } else {
            this.addToast(message, 'Success!', 'success');
        }
    }

    errorMessage(error: any, defaultMessage: string = 'Error, Please refresh the page and try again.'): void {

        if (error.message === 'No JWT present or has expired') {
            this.addToast('You are not login, Please login.', 'Oops!', 'error');
            this.router.navigate(['/login']);
            return;
        }

        if (error === '' || error === null) {
            this.addToast(defaultMessage, 'Oops!', 'error');
            return;
        }

        let allErrors: any = {};
        let message: any = '';

        if (typeof error === 'string') {
            this.addToast(error, 'Oops!', 'error');
        } else if (error.messages !== undefined) {
            if (isJsObject(error.messages)) {
                allErrors = error.messages;
                message = [];
                Object.keys(allErrors).map((key) => {
                    for (const er of allErrors[key]) {
                        message.push(er);
                    }
                });
                message = message.join('<br>');
            } else {
                message = error.messages;
            }
            this.addToast(message, 'Oops!', 'error');

        } else if (error.errors !== undefined) {
            if (isJsObject(error.errors)) {
                allErrors = error.errors;
                message = [];
                Object.keys(allErrors).map((key) => {
                    for (const er of allErrors[key]) {
                        message.push(er);
                    }
                });
                message = message.join('<br>');
            }
            this.addToast(message, 'Oops!', 'error');
        }else if (error.message !== undefined) {

            if (error.message !== undefined || error.message != null) {
                message = error.message;
            }
            this.addToast(message, 'Oops!', 'error');

        }  else {
            if (error.error != undefined || error.error != null) {
                this.addToast(error.error, 'Oops!', 'error');
            } else {
                this.addToast(defaultMessage, 'Oops!', 'error');
            }
        }

        if (error.code === 404) {
            this.router.navigate(['/404']);
        }
    }

    addToast(msg: any, title: any, type: any) {

        const toastOptions: any = {
            title,
            msg,
            showClose: true,
            timeout: 7000,
            theme: 'material',
            onAdd: () => {
            },
            onRemove() {
            }
        };

        switch (type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }
}
