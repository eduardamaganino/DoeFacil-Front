import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsUsuarioComponent } from './details-usuario/details-usuario.component';
import { ListUsuarioComponent } from './list-usuario/list-usuario.component';
import { Route, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { IconsModule } from 'app/core/icons/icons.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { LoginUserComponent } from './login-user/login-user.component';
import { FuseAlertModule } from "../../../@fuse/components/alert/alert.module";
import { AuthSignInComponent } from '../auth/sign-in/sign-in.component';
import { AuthSignUpComponent } from '../auth/sign-up/sign-up.component';

const usuarioRoutes: Route[] = [

  {
    path     : 'create',
    component: DetailsUsuarioComponent,
  },
  {
    path     : 'list/:id',
    component: ListUsuarioComponent,
  },
  {
    path     : 'criesuaconta',
    component: AuthSignUpComponent,
  },
  {
    path     : 'edit/:id',
    component: DetailsUsuarioComponent
  },
  {
    path     : 'login',
    component: AuthSignInComponent
  }
];


@NgModule({
    declarations: [
        DetailsUsuarioComponent,
        ListUsuarioComponent,
        LoginUserComponent
    ],
    imports: [
        RouterModule.forChild(usuarioRoutes),
        CommonModule,
        MatSelectModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
        MatDividerModule,
        MatSelectModule,
        MatRadioModule,
        FormsModule,
        MatMenuModule,
        MatTooltipModule,
        FuseCardModule,
        SharedModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLuxonDateModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        SharedModule,
        FuseAlertModule
    ]
})
export class UsuarioModule { }
