import { Injectable, OnInit } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class PaymentAccount {
    constructor() { }

    initialiseSolde(){
        if (!localStorage.getItem('solde')) {
            localStorage.setItem('solde', JSON.stringify(5000))
        }
    }

    getSolde(){
        return JSON.parse(localStorage.getItem('solde')??'')
    }

    updateSolde(montant: number){
        localStorage.setItem('solde', JSON.stringify(this.getSolde()-montant))
    }
}