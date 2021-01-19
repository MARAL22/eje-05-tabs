import {Component} from '@angular/core';
import {EstudianteService} from '../services/estudiante.service';
import {Estudiante} from '../models/estudiante';
import {AlertController} from '@ionic/angular';
import {Router, NavigationExtras} from '@angular/router';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
    public showmore = false;

    public students: Estudiante[];

    constructor(private service: EstudianteService,
                public alertController: AlertController,
                private router: Router) {
        this.service.getStudents().subscribe(data => {
            this.students = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data() as Estudiante
                };
            });
        });
    }


    update(student: any, active: boolean) {
        student.active = active;
        this.service.updateStudent(student, student.id);
    }

    detail(student: Estudiante) {
        const navext: NavigationExtras = {
            queryParams: {
                special: JSON.stringify(student)
            }
        };
        this.router.navigate(['/detail'], navext);
    }


    async showMore(student: Estudiante) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Más información',
            message: 'Curp:' + student.curp + '<br>' + 'Edad:' + student.age,
            buttons: ['OK']
        });
        await alert.present();
    }
}
