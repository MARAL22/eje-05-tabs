import { Component } from '@angular/core';

import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';


import { Estudiante} from '../models/estudiante';
import {EstudianteService} from '../services/estudiante.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public myForm: FormGroup;
  public student: Estudiante;

  constructor(private studentService: EstudianteService, private fb: FormBuilder) {
  }


  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl('',
          [Validators.required,
            Validators.minLength(4),
            Validators.maxLength(150)]),
      controlnumber: new FormControl('',
          [Validators.required,
            Validators.minLength(10), Validators.maxLength(10)]),
      curp: new FormControl('', [Validators.required]),
      age: new FormControl(0, [Validators.required]),
      active: new FormControl(false, [Validators.required])
    });
  }


  create() {
    this.student = {
      name: this.myForm.controls.name.value,
      controlnumber: this.myForm.controls.controlnumber.value,
      age: this.myForm.controls.age.value,
      curp: this.myForm.controls.curp.value,
      active: this.myForm.controls.active.value
    };

    this.studentService.createStudent(this.student);
  }

}
