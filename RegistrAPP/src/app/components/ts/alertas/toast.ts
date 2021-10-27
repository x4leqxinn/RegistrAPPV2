import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})

export class AlertasToast{
  constructor(private toastController:ToastController){}
  
  // Función Async para invocar Alertas Toasts
async mostrarToast(titulo:string, mensaje:string, duracion:number){
  let toast = await this.toastController.create({
    header: titulo,
    message: mensaje,
    duration: duracion,
    position: 'top',
    animated: true,
    translucent: false,
    color:"dark",
    //showCloseButton: true
    //closeBttonText: "Cerrar"
  });
  toast.present();
}

invocar(titulo,mensaje,duracion){
  this.toastController.create({
    header: titulo,
    message: mensaje,
    duration: duracion,
    position: 'top',
    animated: true,
    translucent: false,
    color:"dark",
    //showCloseButton: true
    //closeBttonText: "Cerrar"
  }).then((toast)=>{
    toast.present();
  })
}

}



