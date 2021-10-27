import { AlertController } from "@ionic/angular";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Mensaje {
    constructor(private alertController: AlertController) { }

    ////////////////////////////////////////
    // Funciones de alertas
    ////////////////////////////////////////

    // Alerta de confirmación
    async mensajeOk(titulo, mensaje) {
        const alert = await this.alertController.create({
            header: titulo,
            message: mensaje,
            buttons: ["OK"],
        })
        await alert.present();
        //Que se cierre cuando aprete el botón
        await alert.onDidDismiss();
    }

    // Alerta de eliminación (True, False)
    async mensajeEliminar() {
        const alert = await this.alertController.create({
            header: "Eliminar",
            message: "¿Estás seguro?",
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log("Cancelar");
                    }
                },
                {
                    text: 'Sí',
                    handler: () => {
                        console.log("Eliminada");
                    }
                }
            ]
        });
        await alert.present();
        //Que se cierre cuando aprete el botón
        await alert.onDidDismiss();
    }

}