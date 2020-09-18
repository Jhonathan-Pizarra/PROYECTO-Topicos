import { Component, OnInit } from '@angular/core';
//
import { PeliculaService } from './../servicios/pelicula.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.page.html',
  styleUrls: ['./detalle-pelicula.page.scss'],
})
export class DetallePeliculaPage implements OnInit {

  content: any = null;

  constructor(private peliService: PeliculaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.peliService.getDetails(id).subscribe(result => this.content = result);
  }

}
