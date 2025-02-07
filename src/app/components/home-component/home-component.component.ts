import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { AsyncPipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
    selector: 'app-home-component',
    standalone: true,
    imports: [
        NgFor,
        AsyncPipe
    ],
    templateUrl: './home-component.component.html',
    styleUrl: './home-component.component.scss'
})
export class HomeComponentComponent implements OnInit {
    constructor(private productSerice: ProductService, private router: Router) { }
    products$!: Observable<Product[]>
    productArray!: {}[]
    ngOnInit(): void {       
        this.getProduct()
    }

    getProduct() {
        this.products$ = this.productSerice.getProduct()
        console.log(this.products$);
        
    }

    redirect(Params: { name: string, prix: number }) {
        this.router.navigateByUrl(`${Params.name}/${Params.prix}/payment-methode`)
    }

}
