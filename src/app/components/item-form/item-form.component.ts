import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../services/product.service';
import { title } from 'process';
import { Router } from '@angular/router';

@Component({
    selector: 'app-item-form',
    imports: [ReactiveFormsModule, MatIconModule],
    templateUrl: './item-form.component.html',
    styleUrl: './item-form.component.scss'
})
export class ItemFormComponent implements OnInit {
    constructor(private fb: FormBuilder, private productservice: ProductService, private router: Router) { }
    item: any;
    form!: FormGroup
    articleForm: any;

    ngOnInit(): void {
        this.form = this.fb.group({
            imageUrl: ['', Validators.required],
            price: ['', Validators.required],
            description: ['', Validators.maxLength(100)],
            title: ['', Validators.required]
        })
    }

    submitForm() {
        this.productservice.setProduct(this.form.value).subscribe()
    }

}
