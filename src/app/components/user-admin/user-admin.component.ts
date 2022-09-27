import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css'],
  providers: [UserService]
})
export class UserAdminComponent implements OnInit {
  public page_title: String
  public user: User
  public status: string
  public identity: any
  public token: any

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'USER ADMIN'
    this.user = new User(1, '', '', '')
    this.status = ''
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.user.name = this.identity.name
    this.user.email = this.identity.email
  }

  ngOnInit(): void {

  }

  onSubmit(form: any) {
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if (response && response.status) {
          this.status = 'success'

          // Actualizar usuario en sesion
          if (response.changes.name) {
            this.user.name = response.changes.name
          }
          if (response.changes.email) {
            this.user.email = response.changes.email
          }
          this.identity = this.user

          localStorage.setItem('identity', JSON.stringify(this.identity))
        } else {
          this.status = 'error'
        }

      },
      error => {
        this.status = 'error'
        console.log(error);

      }
    )

  }
}
