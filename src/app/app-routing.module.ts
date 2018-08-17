import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// components
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { MapComponent } from './components/map/map.component';
import { EventComponent } from './components/event/event.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'event/:id',
    component: EventComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule {}
