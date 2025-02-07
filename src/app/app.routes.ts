import { Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { PaymentSelectionComponentComponent } from './components/payment-selection-component/payment-selection-component.component';
import { PaymentFormComponent } from './components/payment-form-component/payment-form-component.component';
import { LoginFormCompenentComponent } from './components/login-form-compenent/login-form-compenent.component';
import { RegisterFormComponentComponent } from './components/register-form-component/register-form-component.component';
import { ConfirmationComponentComponent } from './components/confirmation-component/confirmation-component.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MyItemListComponent } from './components/my-item-list/my-item-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
export const routes: Routes = [
    {path: 'accueil', component: HomeComponentComponent},
    {path: ':name/:prix/payment-methode', component: PaymentSelectionComponentComponent},
    {path: ':name/:prix/payment-form/:id', component: PaymentFormComponent},
    {path: 'login/:productName/:productPrice/:route', component: LoginFormCompenentComponent},
    {path: 'login', component: LoginFormCompenentComponent},
    {path: 'register/:route', component: RegisterFormComponentComponent},
    {path: 'register', component: RegisterFormComponentComponent},
    {path: ':name/:prix/payment-form/:id/sucess', component: ConfirmationComponentComponent},
    {path: ':name/:prix/payment-form/:id/echec', component: ConfirmationComponentComponent},
    {path: 'items', component: ItemListComponent},
    {path: 'my-items', component: MyItemListComponent},
    {path: 'add-item', component: ItemFormComponent},
    {path: '**', redirectTo:'accueil'}
];
