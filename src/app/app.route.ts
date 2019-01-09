import { LoginComponent } from "./login/login.component";
import { ChatPageComponent } from "./chat-page/chat-page.component";
import { Routes } from "@angular/router";
import { AuthGuard } from "./services/auth.guard";

export const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'chat', canActivate:[AuthGuard], component: ChatPageComponent}
]
