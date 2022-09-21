import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'Register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'REGISTER '
    this.user = new User(1, '', '', '')
    this.status = ''
  }

  ngOnInit(): void {
    console.log(this._userService.test());
  }
  onSubmit(form: any): any {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status
          form.reset()
        } else {
          this.status = 'error'
        }
      }, error => {
        this.status = 'error'
        console.log(error);
      }
    )
  }

}
