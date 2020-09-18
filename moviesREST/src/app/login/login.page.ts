import { Component, OnInit } from '@angular/core';

//importamos la clase del servicio
import { AuthService } from "../servicios/auth.service";
import { Router } from "@angular/router";
//error mensaje
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //variables
  email: string;
  password: string;

  //inyectamos y tenemos el acceso a todos los metodos
  constructor(private authService: AuthService,
    public router: Router,
    public alertCtrl: AlertController) { }


  ngOnInit() {
  }

  //metodo
  onSubmitLogin()
  {
    this.authService.login(this.email, this.password).then(
      res =>{
        this.router.navigate(['/home']);
      },
      res =>{
        this.showAlert();
      })
  }


  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Warning !',
      subHeader: 'Hubo un error!',
      message: 'Verifique los datos',
      buttons: ['OK']  
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

}
