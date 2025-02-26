import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';

@Component({
  selector: 'app-new-student',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.css'
})
export class NewStudentComponent implements OnInit {

  newStudentForm: FormGroup;
  studentId: number; //global variable, for edit button.

  constructor(private formBuilder: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute, //activated route means current route
    private router: Router) {}

  ngOnInit(): void {
    this.newStudentForm = this.formBuilder.group({
      name: [''],
      emailAddress: [''],
      gender: [''],
      phoneNumber: [''],
      major: ['']
    });
    this.studentId = parseInt(this.route.snapshot.paramMap.get('id'));
    if(this.studentId) { //only for edit action, if id is present = edit, is it isnt = new.
      this.studentService.getStudentById(this.studentId) //if id is present, autofill student info
      .subscribe((studentDataFromDatabase: Student) =>{
      this.newStudentForm.patchValue(studentDataFromDatabase); //patches student details to edit button
    })
   }
}

  saveStudent(): void{
    const studentData = this.newStudentForm.value; //extracts value inputted in student form
    if(this.studentId){ //if info already exists = update
      this.studentService.updateStudent(this.studentId, studentData).subscribe((result: string) =>{
        alert(result); 
        this.router.navigate(['list']); //navigates back to list page after updating
      })
    } else{ //else new student
    this.studentService.saveStudent(studentData).subscribe((result: string) => {
      alert(result)
    })
  }
}

}
