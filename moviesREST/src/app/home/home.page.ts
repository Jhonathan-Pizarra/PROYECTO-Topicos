import { Component } from '@angular/core';
//autenticacion para logout
import { AuthService } from "../servicios/auth.service";
//importaciones de las peliculas
import { Observable } from 'rxjs';
import { PeliculaService } from './../servicios/pelicula.service';
import { IPelis } from './../model/IPelis.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //variables de la palicula
  results: Observable<IPelis>;
  term: string = '';
  type: string = '';

  constructor(public authservice : AuthService, 
    private peliService: PeliculaService){}

    Onlogout(){
      this.authservice.logout();
    }

    //metodo de buscar la pelicula
    searchChanged(e): void {
      this.results = this.peliService.searchMovies(this.term, this.type);
    }

}
