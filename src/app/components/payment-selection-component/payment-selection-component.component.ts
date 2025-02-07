import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-selection',
    templateUrl: './payment-selection-component.component.html',
    styleUrls: ['./payment-selection-component.component.scss'],
    imports: [
        MatCard,
        NgClass,
        MatCardContent,
        NgFor,
        MatIconModule
    ]
})
export class PaymentSelectionComponentComponent implements OnInit {
    constructor(private router: Router) { }
    url!: string
    ngOnInit(): void {
        this.url = this.router.url
        console.log(localStorage.getItem('token'))
        if(!localStorage.getItem('identifiant')) {
            this.router.navigateByUrl(`/login${this.router.url}`)
        }

    }
    backTo() {
        this.router.navigateByUrl('/accueil')
    }
    // Liste des options de paiement
    paymentOptions = [
        { id: 'visa', name: 'Carte Bancaire', icon: '/visa.png' },
        { id: 'paypal', name: 'PayPal', icon: '/paypal.png' },
        { id: 'om', name: 'Orange Money', icon: '/orange-money.png' },
        { id: 'momo', name: 'MTN MoMo', icon: '/mtn-momo.png' },
    ];

    // Option sélectionnée
    selectedOption: string | null = null;
    



    // Fonction pour sélectionner une option
    selectPaymentOption(optionId: string): void {
        this.router.navigateByUrl(`${this.url.replace("/payment-methode",'')}/payment-form/${optionId}`)
    }

    // Fonction pour confirmer la sélection
    // confirmSelection(optionId: string, event: Event): void {
    //     event.stopPropagation(); // Empêche le clic sur la carte de se propager
    //     alert(`Vous avez sélectionné : ${this.paymentOptions.find(o => o.id === optionId)?.name}`);
    // }
}
