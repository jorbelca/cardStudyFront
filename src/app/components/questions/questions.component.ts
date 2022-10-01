import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [UserService, TopicService]
})
export class QuestionsComponent implements OnInit {
  public page_title: string
  public question: Question
  public status: string
  public token: string | undefined
  public identity: any

  public topics: any
  // public answer1: any
  // public answer2: any
  // public answer3: any
  // public correct_answer: any
  // public topic: any

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'QUESTIONS'
    this.question = new Question(0, 0, 0, '', [''], '', 0, 0)
    this.status = ''
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this.getTopics()
    // this.question = new Question(0, 0, this.identity.sub, '', [''], 0, 0, 0)

  }
  onSubmit(form: any) { }

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
