import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//autenticacion de firebase
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { promise } from 'protractor';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  // Meotodo para crear un nuevo usuario
  public crearUsuario(data: {nombreF: string, edadF:string, correoF: string } ) {
    return this.firestore.collection('usuarios').add(data);
  }


  /*Meotod 2 para crear usuairos
  public register(email : string, password : string){
    return new Promise ((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
           console.log(res.user.uid);
        const uid = res.user.uid;
          this.firestore.collection('usuarios').doc(uid).set({
            name : name,
            uid : uid
          })

        resolve(res)
      }).catch( err => reject(err))
    })
  }
  */

  // Metodo para obtener un usuario por ID
  public obtenerUsuarioId(documentId: string) {
    return this.firestore.collection('usuarios').doc(documentId).snapshotChanges();
  }
  // Metodo para obtener todos los usuarios
  public ObtenerUsuarios() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }
  // Metodo para actualizar un usuarios
  public actualizarUsuario(documentId: string, data: any) {
    return this.firestore.collection('usuarios').doc(documentId).set(data);
  }
  // Metodo para eliminar un usuario
  public eliminarUsuario(documentId: string) {
    return this.firestore.collection('usuarios').doc(documentId).delete();
  }
}
