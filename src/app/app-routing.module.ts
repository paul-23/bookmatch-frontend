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
import { AboutUsComponent } from './about-us/about-us.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TokenStorageService } from './_services/token-storage.service';
import { Notfound404Component } from './notfound404/notfound404.component';

const routes: Routes = [
  { path: 'appcomp', component: AppComponent},
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'books', component: BookComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile_settings', component: ProfileSettingsComponent},
  { path: 'about', component: AboutUsComponent},

  { path: 'search/:id', component: SearchResultsComponent},
  { path: 'user_books/:id', component: UserBooksComponent},
  { path: 'profile_settings/:id', component: ProfileSettingsComponent},
  { path: 'book_view/:id', component: BookViewComponent},
  { path: 'edit_books/:id', component: EditBooksComponent},
  { path: 'book_view', component: BookViewComponent},
  { path: 'add_book', component: AddBookComponent},
  { path: 'user_books', component: UserBooksComponent},
  { path: 'edit_books', component: EditBooksComponent},

  { path: '**', component: Notfound404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
