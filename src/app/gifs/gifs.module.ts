import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchBoxComponent } from './componets/search-box/search-box.component';
import { CardListComponent } from './componets/card-list/card-list.component';
import { GifsCardComponent } from './componets/gifs-card/gifs-card.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent,
    GifsCardComponent
  ],
  exports: [
    HomePageComponent
  ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class GifsModule { }
