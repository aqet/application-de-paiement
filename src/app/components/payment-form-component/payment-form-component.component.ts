import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PaymentAccount } from '../../services/payment-account.service';

@Component({
    selector: 'app-payment-form',
    standalone: true,
    templateUrl: './payment-form-component.component.html',
    styleUrls: ['./payment-form-component.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        NgIf,
        MatIconModule
    ]
})
export class PaymentFormComponent implements OnInit {

    PaymentInformation!: FormGroup
    typepament!: string
    isLoading!: boolean
    // test$!: Params
    constructor(private fb: FormBuilder, private router: Router, private paymentaccountservice: PaymentAccount) { }
    ngOnInit(): void {
        this.typepament = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
        if (this.typepament == 'visa') {
            this.PaymentInformation = this.fb.group({
                cartNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]], // 16 chiffres pour le numéro de carte
                expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]], // Format MM/YY
                cvvCode: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]], // 3 chiffres pour CVV
            })
        } else if (this.typepament == 'paypal') {
            this.PaymentInformation = this.fb.group({
                paypalEmail: ['', [Validators.required, Validators.email]], // Optionnel, validé uniquement si rempli
            })
        } else if (this.typepament == 'om') {
            this.PaymentInformation = this.fb.group({
                omPhone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // Optionnel, valide si un numéro de téléphone est saisi
                omReason: [''], // Champ libre sans validation
                omUserName: ['', Validators.required], // Optionnel, valide uniquement si rempli
            })
        } else if (this.typepament == 'momo') {
            this.PaymentInformation = this.fb.group({
                momoPhone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // Optionnel
                momoReason: [''], // Champ libre
                momoUserName: ['', Validators.required] // Optionnel
            })
        } else {
            console.log('a');
        }
    }

    backTo() {
        const url = this.router.url.split('/')
        this.router.navigateByUrl(`${this.router.url.replace(`/${url[4]}`, '').replace( 'payment-form', 'payment-methode')}`)
    }

    getErrorMessage(controlName: string): string {
        const control = this.PaymentInformation.get(controlName);
        if (control?.hasError('required')) {
            return 'Ce champ est obligatoire.';
        }
        if (control?.hasError('pattern')) {
            if (controlName === 'cartNumber') return 'Le numéro de carte doit contenir 16 chiffres.';
            if (controlName === 'expirationDate') return 'La date doit être au format MM/YY.';
            if (controlName === 'cvvCode') return 'Le CVV doit contenir 3 chiffres.';
            if (controlName === 'omPhone' || controlName === 'momoPhone') return 'Le numéro de téléphone doit contenir 9 chiffres.';
        }
        if (control?.hasError('email')) {
            return 'Veuillez saisir une adresse email valide.';
        }
        return '';
    }

    submit() {
        this.isLoading = true
        setTimeout(() => {
            this.isLoading = false; // Cache le loader après 2 secondes
            this.paymentaccountservice.initialiseSolde()
            const url = this.router.url.replace('/payment-form', '').split('/')

            if ((+url[2]) <= this.paymentaccountservice.getSolde()) {
                this.paymentaccountservice.updateSolde(+url[2])
                this.router.navigateByUrl(`${url[1].replace(/\/|%20/g, " ")}/${url[2]}/payment-form/${url[3]}/sucess`)
            } else {
                this.router.navigateByUrl(`${url[1]}/${url[2]}/payment-form/${url[3]}/echec`)
            }
        }, 2000);

        // alert('paiement de '+ url[2]+' pour un '+url[1].replace(/\/|%20/g, " "))
        // console.log(this.PaymentInformation.value);
    }
}
