import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

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

import { HttpClientModule } from '@angular/common/http';

import { SearchResultsComponent } from './search-results/search-results.component';
import { AboutUsComponent } from './about-us/about-us.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileSettingsComponent,
    HomeComponent,
    BookComponent,
    BookViewComponent,
    AddBookComponent,
    UserBooksComponent,
    EditBooksComponent,
    AboutUsComponent,
    SearchResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
