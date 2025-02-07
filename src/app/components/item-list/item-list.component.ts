import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-item-list',
    imports: [NgFor, AsyncPipe],
    templateUrl: './item-list.component.html',
    styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
    items: any;

    buyItem(_t5: any) {
        throw new Error('Method not implemented.');
    }

    constructor(private productSerice: ProductService, private router: Router) { }
    products$!: Observable<Product[]>
    productArray!: {}[]
    ngOnInit(): void {
        this.getProduct()
    }

    getProduct() {
        this.products$ = this.productSerice.getAnotherProduct()
    }

    redirect(Params: { name: string, prix: number }) {
        this.router.navigateByUrl(`${Params.name}/${Params.prix}/payment-methode`)
    }

}
