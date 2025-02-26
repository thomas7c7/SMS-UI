import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  api: string = 'http://localhost:8080/student';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  saveStudent(student: Student): Observable<string>{ //stream of data
    return this.http.post<string>(this.api, student, {responseType: 'text' as 'json'}); //student because the request body requires student info to be saved 
  }
  
  //to get all students we dont need any parameters
  getStudentList(): Observable<Student[]> {
    return this.http.get<Student[]>(this.api, this.httpOptions);
  }

  deleteStudent(id: number): Observable<string>{ //this object concats a path variable from java controller
    return this.http.delete<string>(this.api.concat('/').concat(id+''), {responseType: 'text' as 'json'});
  }

  getStudentById(id: number): Observable<Student>{    
    return this.http.get<Student>(this.api.concat('/').concat(id+'')) //id converts from number to string with .concat(id+'')
  }

  updateStudent(studentId: number, student: Student): Observable<string>{ //stream of data
    return this.http.put<string>(this.api.concat('/').concat(studentId+''), student, {responseType: 'text' as 'json'});
  }
}
