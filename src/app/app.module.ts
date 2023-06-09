import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { SearchResultsComponent } from './search-results/search-results.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { Notfound404Component } from './notfound404/notfound404.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthInterceptor } from './_helpers/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

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
    FooterComponent,
    SearchResultsComponent,
    LoaderComponent,
    Notfound404Component,
    NavbarComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
