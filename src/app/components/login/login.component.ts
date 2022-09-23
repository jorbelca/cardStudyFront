import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string
  public token: any;
  public identity: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute

  ) {
    this.page_title = 'Identify',
      this.user = new User(1, '', '', '')
    this.status = ''
    this.identity
  }

  ngOnInit(): void {
    // Se ejecuta siempre y cierra sesion solo cuando le llega el parametro SURE por la url

    this.logout()
  }

  onSubmit(form: any) {
    this._userService.login(this.user).subscribe(
      response => {
        // TOKEN 
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          // OBJETO USUARIO IDENTIFICADO
          this._userService.login(this.user, true).subscribe(
            response => {
              this.identity = response;

              // PERSISTIR DATOS DEL USUARIO IDENTIFICADO
              window.localStorage.setItem('token', this.token)
              window.localStorage.setItem('identity', JSON.stringify(this.identity))

              // Redireccion a inicio
              this._router.navigate(['home'])
            }, error => {
              this.status = 'error';
              console.log(error);
            }
          );
        } else {
          this.status = 'error';
        }

      }, error => {
        console.log(error);
        this.status = 'error';
      }
    )

  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure']
      if (logout == 1) {
        localStorage.removeItem('identity')
        localStorage.removeItem('token')

        this.identity = null
        this.token = null
        // Redireccion a inicio
        this._router.navigate(['home'])
      }
    })
  }
}
