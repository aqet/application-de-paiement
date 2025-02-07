import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-confirmation-component',
    imports: [NgClass, NgIf,MatIconModule],
    templateUrl: './confirmation-component.component.html',
    styleUrl: './confirmation-component.component.scss'
})
export class ConfirmationComponentComponent implements OnInit {
    constructor(private router: Router) { }
    amount!: number;
    paymentMethod!: string;
    productName!: string;
    transactionStatus!: string;
    transactionFailed!: boolean;
    transactionSuccess!: boolean;
    isLoading: boolean=true

    ngOnInit(): void {
        // Simule un délai de chargement (ex: appel API)
        setTimeout(() => {
            this.isLoading = false; // Cache le loader après 2 secondes
        }, 2000);
        this.transactionStatus = this.router.url.split('/')[5]
        this.transactionStatus == 'sucess' ?
            this.transactionSuccess = true
            : this.transactionStatus == 'echec' ?
                this.transactionFailed = true
                : ''

        this.amount = +this.router.url.split('/')[2]
        this.paymentMethod = this.router.url.split('/')[4]
        this.productName = this.router.url.split('/')[1].replace('%20', ' ')
    }

    goToHome() {
        this.router.navigateByUrl('/')
    }
    retryTransaction() {
        this.router.navigateByUrl(`${this.router.url.replace(`/${this.transactionStatus}`, '')}`)
    }
}
