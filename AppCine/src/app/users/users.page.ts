import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/servicios/firebase.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  // CERAR UN ARREGLO
  public usuarios:any = [];
  //Variables
   myFormUsers: FormGroup;
  // PARA LA PARTE DE AGREGAR Y ACTUALIZAR UN AUTO
   public documentId = null;
   public currentStatus = 1;

  constructor(private serviceStore: FirebaseService)  { }

  ngOnInit(): void {

     this.obtenerUsuarios();
     this.myFormUsers = new FormGroup({
       nombreF: new FormControl(''),
       edadF: new FormControl(''),
       correoF: new FormControl(''),
       idF: new FormControl('')
     });
  }

  // CREAR UN METODO PARA OBTENER TODOS LOS Uusario
  public obtenerUsuarios() {
     this.serviceStore.ObtenerUsuarios().subscribe((r)=>{
       this.usuarios= r.map(i =>
        {
        this.usuarios = i.payload.doc.data() as {};
        const id = i.payload.doc.id;
        return {id, ...this.usuarios}
        }
       )
     })
   }

   // METODO PARA CARGAR LOS DATOS EN LOS CAMPOS DEL FORMULARIO
   // POSTERIOR A ELLO REALIZAR EL ACTUALIZAR
   public actualizarUsuario(documentId) {
     let editSubscribe = this.serviceStore.obtenerUsuarioId(documentId).subscribe((data) => {
       this.currentStatus = 2;
       this.documentId = documentId;
       this.myFormUsers.setValue({
         idF: documentId,
         nombreF: data.payload.data()['nombre'],
         edadF: data.payload.data()['edad'],
         correoF: data.payload.data()['correo'],
       });
       editSubscribe.unsubscribe();
     });
   }

  //METODO PARA ACTUALIZAR Y AGREGAR UN NUEVO Usuario
  public nuevoUsuario(form, documentId = this.documentId) {
    if (this.currentStatus == 1) {
      let data = {
        nombreF: form.nombreF,
        edadF: form.edadF,
        correoF: form.correoF
      }
      this.serviceStore.crearUsuario(data).then(() => {
        console.log('Creado exitósamente!');
        this.myFormUsers.setValue({
          nombreF: '',
          edadF:'',
          correoF:'',
          idF:''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        nombre: form.nombreF,
        edad: form.edadF,
        correo: form.correoF
      }

      this.serviceStore.actualizarUsuario(documentId, data).then(() => {
        this.myFormUsers.setValue({
          nombreF: '',
          edadF: '',
          correoF: '',
          idF: ''
        });
        console.log('Editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

  //ELIMINAR Usuario
  public eliminarUsuario(documentId) {
    this.serviceStore.eliminarUsuario(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }


}
