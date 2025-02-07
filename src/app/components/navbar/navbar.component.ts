import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [NgIf],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
    constructor(private router: Router){}
    isLoggedIn!: boolean
    url!:boolean
    ngOnInit(): void {
        this.url = window.location.href.includes('login')||window.location.href.includes('register')
        if (localStorage.getItem('identifiant')) {
            this.isLoggedIn = true
            // window.location.href=`${window.location.href}`
        } else {
            this.isLoggedIn = false
        }
    }

    redirectTo(params: string){
        this.router.navigateByUrl(params)
    }

    login() {
        this.router.navigateByUrl('login')
    }
    logout() {
        localStorage.removeItem('identifiant')
        window.location.href="#"
    }


}
