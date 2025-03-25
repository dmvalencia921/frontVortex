import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
// import { AuthInterceptorProvider } from './interceptor/auth.interceptor';
import { LoginComponent } from './login/login.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
// import { UnauthorizedComponent } from './unauthorized/unauthorized.component'; 
import { DropdownModule } from 'primeng/dropdown';
import '@angular/common/locales/global/es-CO';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    MenubarModule,
    ToastModule,
    HttpClientModule,
    RouterOutlet,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    PanelMenuModule,
    SidebarModule,
    MenuModule,
    TieredMenuModule,
    PasswordModule,
    InputTextModule,
    InputSwitchModule,
    FormsModule,
    DropdownModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
