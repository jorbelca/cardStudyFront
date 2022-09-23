import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  public page_title: String
  public user: User
  public status: string
  constructor() {
    this.page_title = 'USER ADMIN'
    this.user = new User(1, '', '', '')
    this.status = ''
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) { }
}
