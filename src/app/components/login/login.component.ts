import { Component, OnInit } from '@angular/core';
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
    private _userService: UserService
  ) {
    this.page_title = 'Identify',
      this.user = new User(1, '', '', '')
    this.status = ''
    this.identity = ''
  }

  ngOnInit(): void {
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
}
