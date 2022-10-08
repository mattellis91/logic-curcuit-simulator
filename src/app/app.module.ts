import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {EditorComponent} from './editor/editor.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DockComponent } from './editor/dock/dock.component';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    DragDropModule,
    MatGridListModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
