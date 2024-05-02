import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuesComponent } from './components/issues/issues.component';
import { StatsComponent } from './components/stats/stats.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { MinutesComponent } from './components/minutes/minutes.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StackoverflowComponent } from './components/stackoverflow/stackoverflow.component';
import { GetIssueComponent } from './components/issues/get-issue/get-issue.component';
import { CreateIssueComponent } from './components/issues/create-issue/create-issue.component';
import { DeleteIssueComponent } from './components/issues/delete-issue/delete-issue.component';
import { UpdateIssueComponent } from './components/issues/update-issue/update-issue.component';
import { ConfluenceComponent } from './components/confluence/confluence.component';
import { CreateCommentComponent } from './components/confluence/create-comment/create-comment.component';
import { CreatePageComponent } from './components/confluence/create-page/create-page.component';
import { DeleteAttachmentsComponent } from './components/confluence/delete-attachments/delete-attachments.component';
import { DeleteCommentComponent } from './components/confluence/delete-comment/delete-comment.component';
import { DeletePageComponent } from './components/confluence/delete-page/delete-page.component';
import { EditCommentComponent } from './components/confluence/edit-comment/edit-comment.component';
import { FooterCommentsComponent } from './components/confluence/footer-comments/footer-comments.component';
import { GetAttachmentsComponent } from './components/confluence/get-attachments/get-attachments.component';
import { InlineCommentsComponent } from './components/confluence/inline-comments/inline-comments.component';
import { ReadPageComponent } from './components/confluence/read-page/read-page.component';
import { SpaceDetailsComponent } from './components/confluence/space-details/space-details.component';
import { SpecificPageComponent } from './components/confluence/specific-page/specific-page.component';
import { UpdatePageComponent } from './components/confluence/update-page/update-page.component';
import { CreateProjectComponent } from './components/issues/create-project/create-project.component';
import { UpdateProjectComponent } from './components/issues/update-project/update-project.component';
import { GetProjectComponent } from './components/issues/get-project/get-project.component';
import { DeleteProjectComponent } from './components/issues/delete-project/delete-project.component';
import { GetTranitionsComponent } from './components/issues/get-tranitions/get-tranitions.component';
import { TransitionIssueComponent } from './components/issues/transition-issue/transition-issue.component';
import { GetIssuesCountComponent } from './components/issues/get-issues-count/get-issues-count.component';
import { UserComponent } from './components/user/user.component';
import { SearchUserComponent } from './components/user/search-user/search-user.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserPermissionsComponent } from './components/user/user-permissions/user-permissions.component';
const routes: Routes = [
  { path: 'issues', component: IssuesComponent },
  { path: 'stats', component: StatsComponent},
  {path:'analytics', component: AnalyticsComponent},
  { path: 'minutes', component: MinutesComponent },
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stackoverflow', component: StackoverflowComponent },
  { path: 'createIssue', component: CreateIssueComponent },
  { path: 'readIssue', component: GetIssueComponent },
  { path: 'updateIssue', component: UpdateIssueComponent },
  { path: 'deleteIssue', component: DeleteIssueComponent },
  { path: 'assignIssue', component: StackoverflowComponent },
  { path: 'transitionIssue', component: TransitionIssueComponent },
  { path: 'notificationIssue', component: StackoverflowComponent },
  { path: 'getTransitions', component: GetTranitionsComponent },
  { path: 'createComment', component: CreateCommentComponent },
  { path: 'createPage', component: CreatePageComponent },
  { path: 'deleteAttachments', component: DeleteAttachmentsComponent },
  { path: 'deleteComment', component: DeleteCommentComponent },
  { path: 'deletePage', component: DeletePageComponent },
  { path: 'editComment', component: EditCommentComponent },
  { path: 'footerComments', component: FooterCommentsComponent },
  { path: 'getAttachments', component: GetAttachmentsComponent },
  { path: 'inlineComments', component: InlineCommentsComponent },
  { path: 'readPage', component: ReadPageComponent },
  { path: 'spaceDetails', component: SpaceDetailsComponent },
  { path: 'specificPage', component: SpecificPageComponent },
  { path: 'updatePage', component: UpdatePageComponent },
  { path: 'confluence', component: ConfluenceComponent },
  { path: 'createProject', component: CreateProjectComponent },
  { path: 'updateProject', component: UpdateProjectComponent },
  { path: 'getProject', component: GetProjectComponent },
  { path: 'deleteProject', component: DeleteProjectComponent },
  { path: 'getIssuesCount', component: GetIssuesCountComponent },
  { path: 'user', component: UserComponent},
  { path: 'searchUser', component: SearchUserComponent },
  { path: 'userDetails', component: UserDetailsComponent },
  { path: 'userPermissions', component: UserPermissionsComponent },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
