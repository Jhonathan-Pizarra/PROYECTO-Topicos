import { Injectable } from '@angular/core';

//autenticacion de firebase
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

//
import { promise } from 'protractor';
import { AngularFirestore } from "@angular/fire/firestore";
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth, private router : Router) { }


  //Login
  async login(email: string, password: string) {
      try {
      const { user } = await this.AFauth.auth.signInWithEmailAndPassword(email,password);
        return user;
      }
     catch (error) {
      console.log(error);
    }

    }
  /*metodo de Login
  login(email:string, password:string){

      //return una promesa
      return new Promise((resolve, rejected) =>{
        this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
          resolve(user);
        }).catch(err => rejected(err));
      });
  }
  */


 // Método de registrar
 async register(email: string, password: string) {
    try {
      const { user } = await this.AFauth.auth.createUserWithEmailAndPassword(email,password);
      return user;
    } catch (error) {
      console.log(error);
    }
  }


/*Registrar
  register(email : string, password : string){
    return new Promise ((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
           console.log(res.user.uid);
        const uid = res.user.uid;
          this.firestore.collection('users').doc(uid).set({
            name : name,
            uid : uid
          })

        resolve(res)
      }).catch( err => reject(err))
    })
  }
*/


//Cerrar sesion
  logout(){
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

//Captirar usuario
  getCurrentUser(){
  return this.AFauth.authState.pipe(first()).toPromise();
}

}
