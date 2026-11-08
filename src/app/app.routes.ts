import { Routes } from '@angular/router';
import { CommuniqueList } from './components/communique-list/communique-list';
import { CommuniqueContent } from './components/communique-content/communique-content';
import { CommuniqueForm } from './components/communique-form/communique-form';

export const routes: Routes = [
    {path:"", component:CommuniqueList},
    {path:"new", component:CommuniqueForm},
    {path:":id", component:CommuniqueContent},
];
