import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MineMeisterComponent } from './mine-meister/mine-meister.component';
import { MineGridComponent } from './mine-grid/mine-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MineMeisterComponent,
    MineGridComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
