import { ValidatorFn, AbstractControl, NgForm, FormGroup } from '@angular/forms';

export class CustomValidator {

    static email(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);

            return (control.value && !emailRegex.test(control.value) ? { email: true } : null);
        };
    }

    static strongPassword(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const regex = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*)[A-Za-z\d][A-Za-z\d!@#$%^&*()_.,+]{2,}$/);
            return (control.value && !regex.test(control.value) ? { strongPassword: true } : null);
        };
    }

    static numaric(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const regex = new RegExp(/^[0-9]{2,}$/);
            return (control.value && !regex.test(control.value) ? { numaric: true } : null);
        };
    }
    static minLength(minLength): ValidatorFn {

        return (control: AbstractControl): { [key: string]: any } | null => {
            const length = (control.value + '').length;
            return (length < minLength) ? { minLength: true } : null;
        };
    }
    static maxLength(maxLength): ValidatorFn {

        return (control: AbstractControl) => {
            const length = (control.value + '').length;
            return (length > maxLength) ? { maxLength: true } : null;
        };
    }

    static isEqual(form: FormGroup, toControlName: string): ValidatorFn {
        return (control: AbstractControl) => {
            if (!form) {
                return null;
            }
            return control.value === form.get(toControlName).value ? null : { notEqual: true };

        };
    }
}
