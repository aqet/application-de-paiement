import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';

@Component({
    selector: 'app-login-form-compenent',
    imports: [NgIf, ReactiveFormsModule],
    templateUrl: './login-form-compenent.component.html',
    styleUrl: './login-form-compenent.component.scss'
})
export class LoginFormCompenentComponent implements OnInit {
    loginForm!: FormGroup
    // accounts = JSON.parse(localStorage.getItem('Accounts') ?? "") || [];

    constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService) { }
    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]], // Format MM/YY
        })
    }
    
    onLogin() {
        const url = this.router.url.replace('/login', '')
        this.authservice.findLogin(this.loginForm.value).pipe(
            tap((Response:any) => {
                if (Response) {
                    console.log(Response.token);
                    localStorage.setItem('identifiant', JSON.stringify({'token': Response.token, 'userid':Response.userId}));
                    this.router.navigateByUrl(`${url}`)
                } else {
                    console.error('Echec de l\'enregistrement');
                }
            })
        ).subscribe()
    }



    getErrorMessage(controlName: string): string {
        const control = this.loginForm.get(controlName);
        if (control?.hasError('required')) {
            return 'Ce champ est obligatoire.';
        }
        if (control?.hasError('pattern')) {
            return 'Le mot de pass doit contenir 5 chiffres.';
        }
        if (control?.hasError('email')) {
            return 'Veuillez saisir une adresse email valide.';
        }
        return '';
    }

}

