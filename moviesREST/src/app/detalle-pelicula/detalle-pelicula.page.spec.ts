import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallePeliculaPage } from './detalle-pelicula.page';

describe('DetallePeliculaPage', () => {
  let component: DetallePeliculaPage;
  let fixture: ComponentFixture<DetallePeliculaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePeliculaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePeliculaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
