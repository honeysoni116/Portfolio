import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Work } from './components/work/work';
import { Contact } from './components/contact/contact';
import { Comp } from './components/comp/comp';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        component: Home 
    },
    {
        path: 'about',
        component: About 
    },
    {
        path: 'work',
        component: Work
    },
    {
        path: 'contact',
        component: Contact
    },
    {
        path: 'components',
        component: Comp
    },
    {
        path: 'dashboard',
        component: Dashboard,
        data: { isHeaderHide: true }
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
