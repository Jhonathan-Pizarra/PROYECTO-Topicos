import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//configuracion de firebase credenciales
import { firebaseConfig } from "../environments/environment";
//lib de angularFireModelo
import { AngularFireModule } from "@angular/fire";
//modulo de autenticacion de Firebase
import { AngularFireAuthModule } from "@angular/fire/auth";

//crear el home de las paliculas
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    //inicializamos la app con la configuración de enviroment
    AngularFireModule.initializeApp(firebaseConfig),
    //modulo de firebase
    AngularFireAuthModule,
    //cominocacion
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
