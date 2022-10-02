import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyListPageRoutingModule } from './my-list-routing.module';

import { MyListPage } from './my-list.page';
import { PipesModule } from 'src/app/modules/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyListPageRoutingModule,
    PipesModule,
  ],
  declarations: [MyListPage]
})
export class MyListPageModule {}
