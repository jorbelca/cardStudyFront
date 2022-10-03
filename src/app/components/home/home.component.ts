import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [QuestionService]
})
export class HomeComponent implements OnInit {
  public page_title: string
  public url: string
  public questions: [Question] = [new Question(0, 0, 0, '', 0, 0, 0, 0, 0, 0)]

  constructor(
    private _questionService: QuestionService
  ) {
    this.page_title = 'HOME'
    this.url = ''
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
}
