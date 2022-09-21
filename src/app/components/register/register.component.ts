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
  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'REGISTER '
    this.user = new User(1, '', '', '')
  }

  ngOnInit(): void {
    console.log(this._userService.test());
  }
  onSubmit(form: any): any {
    console.log(this.user);


    form.reset()
  }

}
