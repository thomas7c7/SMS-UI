import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterLink, CommonModule], //RouterLink allows switching paths
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  studentList: Student[] = []; //exports data from student.service to this variable

  constructor(private studentService: StudentService){}

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents(): void { //displays details on student list page
    this.studentService.getStudentList().subscribe((studentList: Student[]) => {
      this.studentList = studentList;
      console.log(studentList);
    })
  }

  deleteStudent(studentId: number): void{
   // alert(studentId); this is to check in console if the delete function is working
   this.studentService.deleteStudent(studentId).subscribe((result: string) => {
    if(result == 'Student deleted successfully'){
      alert('Student Deleted!');
      this.getAllStudents(); //once student is deleted, table refreshes
    }
  })
  }
}
