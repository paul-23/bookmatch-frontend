import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './books/books.component';
import { BookViewComponent } from './book-view/book-view.component';
import { AddBookComponent } from './add-book/add-book.component';
import { UserBooksComponent } from './user-books/user-books.component';
import { EditBooksComponent } from './edit-books/edit-books.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'books', component: BookComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile_settings', component: ProfileSettingsComponent},

  { path: 'book_view', component: BookViewComponent},
  { path: 'add_book', component: AddBookComponent},
  { path: 'user_books', component: UserBooksComponent},
  { path: 'edit_books', component: EditBooksComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
