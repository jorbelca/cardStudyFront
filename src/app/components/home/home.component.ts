import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [QuestionService, UserService]
})
export class HomeComponent implements OnInit {
  public page_title: string
  public url: string
  public questions: [Question] = [new Question(0, 0, 0, '', 0, 0, 0, 0, 0, 0)]
  public identity: any
  public token: string | undefined
  public answer1: any
  public answer2: any
  public answer3: any
  constructor(
    private _questionService: QuestionService,
    private _userService: UserService
  ) {
    this.page_title = 'HOME'
    this.url = ''
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.answer1 = ''
    this.answer2 = ''
    this.answer3 = ''
  }

  ngOnInit(): void {
    this.getQuestions()
  }

  getQuestions() {
    this._questionService.getQuestions().subscribe(
      response => {
        if (response.status == 'success') {
          this.questions = response.questions

        }
      }, error => {
        console.log(error);

      }
    )
  }

  onSubmitUpdate() { }
  onDelete(){}
}
