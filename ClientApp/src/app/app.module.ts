import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
import * as appReducer from './store/reducers';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { CalculatorComponent } from './calculator/calculator.component';
import { AppService } from './services/app.service';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CalculatorComponent,
    LoginComponent
  ],
  exports: [BrowserAnimationsModule],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    StoreModule.forRoot({appState: appReducer.reducer}),
    // EffectsModule.forRoot([]),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'calculator', component: CalculatorComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
