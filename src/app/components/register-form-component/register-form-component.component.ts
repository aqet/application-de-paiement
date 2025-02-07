import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { delay, tap } from 'rxjs';

@Component({
    selector: 'app-register-form-component',
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './register-form-component.component.html',
    styleUrl: './register-form-component.component.scss'
})
export class RegisterFormComponentComponent {
    registerForm!: FormGroup
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authservice: AuthService
    ) { }
    ngOnInit(): void {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]], // Format MM/YY
        })
    }

    onRegister() {
        console.log('1');
        this.authservice.findRegister(this.registerForm.value).pipe(
            tap((Response:any) => {
                if (Response) {
                    this.router.navigateByUrl('/login')
                } else {
                    console.error('Echec de l\'enregistrement');
                }
            })
        ).subscribe()
        // console.log(test);

        // localStorage.setItem('Accounts', JSON.stringify({ ...this.registerForm.value, status: true }));
        // this.router.navigateByUrl('/payment-methode')
    }

    getErrorMessage(controlName: string): string {
        const control = this.registerForm.get(controlName);
        if (control?.hasError('required')) {
            return 'Ce champ est obligatoire.';
        }
        if (control?.hasError('pattern')) {
            return 'Veuillez saisir une adresse email valide.';
        } else {
            return 'Le mot de pass doit contenir 5 chiffres.';
        }
        return '';
    }


}
