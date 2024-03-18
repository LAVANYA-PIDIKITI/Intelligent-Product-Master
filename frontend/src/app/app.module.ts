import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StatsComponent } from './components/stats/stats.component';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { IssuesComponent } from './components/issues/issues.component';
import { StatusComponent } from './components/status/status.component';
import { StackComponent } from './components/stack/stack.component';
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    StatsComponent,
    HeatmapComponent,
    IssuesComponent,
    StatusComponent,
    StackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
