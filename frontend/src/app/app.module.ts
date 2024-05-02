import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from "ng-apexcharts";
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationService } from './components/issues/notification.service';
import{LoadingInterceptor} from './loading.interceptor'


import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StatsComponent } from './components/stats/stats.component';
import { IssuesComponent } from './components/issues/issues.component';
import { StatusComponent } from './components/status/status.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { AreachartComponent } from './components/areachart/areachart.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { LinechartComponent } from './components/linechart/linechart.component';
import { GridComponent } from './components/grid/grid.component';
import { ParetoComponent } from './components/pareto/pareto.component';
import { ColumnchartComponent } from './components/columnchart/columnchart.component';
import { SplinechartComponent } from './components/splinechart/splinechart.component';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { CardsComponent } from './components/cards/cards.component';
import { ProgressCardComponent } from './components/progress-card/progress-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StackoverflowComponent } from './components/stackoverflow/stackoverflow.component';
import { MinutesComponent } from './components/minutes/minutes.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AudioTrackComponent } from './components/audio-track/audio-track.component';
import { LoginComponent } from './components/login/login.component';
import { GetIssueComponent } from './components/issues/get-issue/get-issue.component';
import { DeleteIssueComponent } from './components/issues/delete-issue/delete-issue.component';
import { UpdateIssueComponent } from './components/issues/update-issue/update-issue.component';
import { CreateIssueComponent } from './components/issues/create-issue/create-issue.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ConfluenceComponent } from './components/confluence/confluence.component';
import { CreatePageComponent } from './components/confluence/create-page/create-page.component';
import { ReadPageComponent } from './components/confluence/read-page/read-page.component';
import { UpdatePageComponent } from './components/confluence/update-page/update-page.component';
import { DeletePageComponent } from './components/confluence/delete-page/delete-page.component';
import { SpecificPageComponent } from './components/confluence/specific-page/specific-page.component';
import { SpaceDetailsComponent } from './components/confluence/space-details/space-details.component';
import { FooterCommentsComponent } from './components/confluence/footer-comments/footer-comments.component';
import { InlineCommentsComponent } from './components/confluence/inline-comments/inline-comments.component';
import { CreateCommentComponent } from './components/confluence/create-comment/create-comment.component';
import { DeleteCommentComponent } from './components/confluence/delete-comment/delete-comment.component';
import { EditCommentComponent } from './components/confluence/edit-comment/edit-comment.component';
import { GetAttachmentsComponent } from './components/confluence/get-attachments/get-attachments.component';
import { DeleteAttachmentsComponent } from './components/confluence/delete-attachments/delete-attachments.component';
import { SearchIssueComponent } from './components/issues/search-issue/search-issue.component';
import { ProjDetailsComponent } from './components/issues/proj-details/proj-details.component';
import { CreateProjectComponent } from './components/issues/create-project/create-project.component';
import { UpdateProjectComponent } from './components/issues/update-project/update-project.component';
import { DeleteProjectComponent } from './components/issues/delete-project/delete-project.component';
import { GetProjectComponent } from './components/issues/get-project/get-project.component';
import { GetTranitionsComponent } from './components/issues/get-tranitions/get-tranitions.component';
import { TransitionIssueComponent } from './components/issues/transition-issue/transition-issue.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { SearchUserComponent } from './components/user/search-user/search-user.component';
import { UserPermissionsComponent } from './components/user/user-permissions/user-permissions.component';
import { GetIssuesCountComponent } from './components/issues/get-issues-count/get-issues-count.component';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    StatsComponent,
    IssuesComponent,
    StatusComponent,
    AnalyticsComponent,
    BarchartComponent,
    AreachartComponent,
    PiechartComponent,
    LinechartComponent,
    GridComponent,
    ParetoComponent,
    ColumnchartComponent,
    SplinechartComponent,
    HeatmapComponent,
    CardsComponent,
    ProgressCardComponent,
    DashboardComponent,
    NavbarComponent,
    StackoverflowComponent,
    MinutesComponent,
    FileUploadComponent,
    AudioTrackComponent,
    LoginComponent,
    GetIssueComponent,
    DeleteIssueComponent,
    UpdateIssueComponent,
    CreateIssueComponent,
    PreloaderComponent,
    ConfluenceComponent,
    CreatePageComponent,
    ReadPageComponent,
    UpdatePageComponent,
    DeletePageComponent,
    SpecificPageComponent,
    SpaceDetailsComponent,
    FooterCommentsComponent,
    InlineCommentsComponent,
    CreateCommentComponent,
    DeleteCommentComponent,
    EditCommentComponent,
    GetAttachmentsComponent,
    DeleteAttachmentsComponent,
    SearchIssueComponent,
    ProjDetailsComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    DeleteProjectComponent,
    GetProjectComponent,
    GetTranitionsComponent,
    TransitionIssueComponent,
    UserComponent,
    UserDetailsComponent,
    SearchUserComponent,
    UserPermissionsComponent,
    GetIssuesCountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    NgApexchartsModule,
    MatCardModule,
    AgGridModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true 
    }),
    BrowserAnimationsModule,
  ],
  providers: [NotificationService,
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
