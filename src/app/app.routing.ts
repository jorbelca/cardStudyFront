import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./components/error/error.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { TopicsComponent } from "./components/topics/topics.component";
import { UserAdminComponent } from "./components/user-admin/user-admin.component";


// DEFINE ROUTES
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: UserAdminComponent },
  { path: 'topics', component: TopicsComponent },
  { path: '**', component: ErrorComponent }
]

// EXPORT CONFIGURATION
export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)