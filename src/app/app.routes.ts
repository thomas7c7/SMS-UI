import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { NewStudentComponent } from './pages/new-student/new-student.component';


export const routes: Routes = [
 {path: '', component: LoginComponent}, //Opens login path 
 {path: 'signup', component: SignupComponent},//opens signup path, allows user to signup
 {path: 'list', component: StudentListComponent}, //home page where student details are displayed
 {path: 'new', component: NewStudentComponent}, // new student creation
 {path: 'update/:id', component: NewStudentComponent} // ':id' means the id can change(dynamic), reusing newstudentcomponent to avoid duplicates
 ];
