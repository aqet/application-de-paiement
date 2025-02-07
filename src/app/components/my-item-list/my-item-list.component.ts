import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { map, Observable, tap } from 'rxjs';
import { Product } from '../../models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-my-item-list',
    imports: [NgFor, AsyncPipe, NgIf, MatIconModule, ReactiveFormsModule],
    templateUrl: './my-item-list.component.html',
    styleUrl: './my-item-list.component.scss'
})
export class MyItemListComponent implements OnInit {

    constructor(private productService: ProductService, private fb: FormBuilder) { }
    myItems: any;
    products$!: Observable<Product[]>
    form!: FormGroup
    isVisible!: boolean
    product$!: Observable<Product>
    id!: string
    ngOnInit(): void {
        this.form = this.fb.group({
            imageUrl: ['', Validators.required],
            price: [778, Validators.required],
            description: ['', Validators.maxLength(100)],
            title: ['', Validators.required]
        })
        this.getProduct()
    }

    submitForm() {
        this.productService.updateProduct(this.id, this.form.value).subscribe()
        this.isVisible=!this.isVisible
    }

    deleteItem(arg0: string) {
        this.productService.deleteProduct(arg0).subscribe()
        // window.location.href='my-items'
        setTimeout(() => {
            this.getProduct()
        }, 1000);
    }
    editItem(id: string) {
        this.productService.getSingleProduct(id).subscribe(product => {
            this.form.patchValue(product);
        })
        this.id = id
        this.isVisible = true
    }

    getProduct() {
        this.products$ = this.productService.getMyProduct()
    }

}
