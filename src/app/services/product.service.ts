import { Injectable } from '@angular/core'
import { Product } from '../models/product.model'
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { map, Observable, tap} from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    
    constructor(private http: HttpClient) {}

    getProduct(): Observable<Product[]> {
        return this.http.get<Product[]>('http://localhost:3000/api/stuff')
    }

    getAnotherProduct(){
        const userId = JSON.parse(localStorage.getItem('identifiant')??"")
        return this.http.get<Product[]>('http://localhost:3000/api/stuff').pipe(
            map((product:Product[]) => (product.filter(product => product?.userId != userId.userid)))
        )
    }

    getMyProduct(){
        const userId = JSON.parse(localStorage.getItem('identifiant')??"")
        return this.http.get<Product[]>('http://localhost:3000/api/stuff').pipe(
            map((product:Product[]) => (product.filter(product => product?.userId == userId.userid)))
        )
    }

    setProduct(params: {}){
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('identifiant')??'').token // Remplace par ton token
        });
        // const token = localStorage.getItem('token')
        return this.http.post<boolean>('http://localhost:3000/api/stuff', params, {headers})
    }

    deleteProduct(id:string){
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('identifiant')??'').token // Remplace par ton token
        });
        // const token = localStorage.getItem('token')
        return this.http.delete<boolean>(`http://localhost:3000/api/stuff/${id}`, {headers})
    }

    updateProduct(id:string, params:{}){
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('identifiant')??'').token // Remplace par ton token
        });
        // const token = localStorage.getItem('token')
        return this.http.put<boolean>(`http://localhost:3000/api/stuff/${id}`, params, {headers})
    }

    getSingleProduct(id:string){
        console.log(id);
        
        return this.http.get<Product>(`http://localhost:3000/api/stuff/${id}`)
    }
}