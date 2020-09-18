import { Component, OnInit } from '@angular/core';
//
import { AuthService } from "./../servicios/auth.service";
import { Router } from "@angular/router";
//error mensaje
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public  email : string;
  public  name : string;
  public password : string;

  constructor(private auth : AuthService, 
    private router : Router,
    public alertCtrl: AlertController) { }


  ngOnInit() {
  }

  OnSubmitRegister(){
    this.auth.register(this.email, this.password).then( 
      auth => {
        this.router.navigate(['home'])
        console.log(auth)
      },

      auth =>{
        this.showAlert();
      }
    );
  }

  async showAlert() {  
    const alert = await this.alertCtrl.create({  
      header: 'Warning !',  
      subHeader: 'Hubo un error!',  
      message: 'Complete el formulario =(',  
      buttons: ['OK']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);  
  }
}
