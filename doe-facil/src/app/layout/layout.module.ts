import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { ModernLayoutModule } from 'app/layout/layouts/horizontal/modern/modern.module';
import { SharedModule } from 'app/shared/shared.module';

const layoutModules = [
    ModernLayoutModule,

];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        SharedModule,
        ...layoutModules
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
