import { Routes } from '@angular/router';
import { CommuniqueList } from './components/communique-list/communique-list';
import { CommuniqueContent } from './components/communique-content/communique-content';

export const routes: Routes = [
    {path:"", component:CommuniqueList},
    {path:":id", component:CommuniqueContent},
];
