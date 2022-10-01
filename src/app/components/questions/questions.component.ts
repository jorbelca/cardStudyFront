import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [UserService, TopicService, QuestionService]
})
export class QuestionsComponent implements OnInit {
  public page_title: string
  public question: Question
  public status: string
  public token: string | undefined
  public identity: any
  public topics: any
  public answer1: any
  public answer2: any
  public answer3: any


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService,
    private _questionService: QuestionService
  ) {
    this.page_title = 'Add a question'
    this.question = new Question(0, 0, 0, '', [''], '', 0, 0)

    this.status = ''
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this.getTopics()
  }

  onSubmit(form: any) {
    this.question.answers = this.answer1 + ',' + this.answer2 + ',' + this.answer3
    this.question.creator_id = this.identity.sub
    console.log(this.question);


    this._questionService.save(this.token, this.question).subscribe(
      response => {
        if (response.status == 'success') {
          this.question = response.question
          this.status = response.status
          this._router.navigate(['/home'])
        } else {
          this.status = 'error'
        }
      }, error => {
        console.log(error);
        this.status = 'error'
      }
    )
  }

  getTopics() {
    this._topicService.getTopics().subscribe(
      response => {
        if (response.status == 'success') {
          this.topics = response.topics
        }
      },
      error => {
        console.log(error);

      }
    )
  }
}
