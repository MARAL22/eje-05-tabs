import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Estudiante} from '../models/estudiante';
import {EstudianteService} from '../services/estudiante.service';
import {ToastController} from '@ionic/angular';


@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

    student: Estudiante;

    constructor(private service: EstudianteService,
                private actroute: ActivatedRoute,
                private router: Router,
                private toast: ToastController) {
        this.actroute.queryParams.subscribe(
            params => {
                if (params && params.special) {
                    this.student = JSON.parse(params.special) as Estudiante;
                }
            }
        );
    }

    ngOnInit() {
    }

    delete(id: string){
        this.service.deleteStudent(id);
        this.presentToast('Estudiante eliminado');
        this.router.navigate(['tabs/tab2']);
    }

    update(id: string, student: Estudiante){
        this.service.updateStudent(student,id);
        this.presentToast('Estudiante Actualizado');
        this.router.navigate(['tabs/tab2']);
    }
    async presentToast(msg: string){
        const t = await this.toast.create({
            message: msg,
            duration: 2000
        });

        t.present();
    }
}
