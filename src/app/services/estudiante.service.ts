import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Estudiante} from '../models/estudiante';

@Injectable({
    providedIn: 'root'
})
export class EstudianteService {

    constructor(private firestore: AngularFirestore) {
    }

    createStudent(student: Estudiante) {
        return this.firestore.collection('estudiante').add(student);
    }

    getStudents() {
        return this.firestore.collection('estudiante').snapshotChanges();
    }

    updateStudent(student: any, id: string) {
        this.firestore.doc('estudiante/' + id).update(student);
    }

    deleteStudent(id: string) {
        this.firestore.doc('estudiante/' + id).delete();
    }
}
