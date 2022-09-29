import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [UserService, TopicService]
})
export class TopicsComponent implements OnInit {
  public page_title: string;
  public identity: any;
  public token: any;
  public topic: Topic
  public status: string
  public topics: any

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService

  ) {
    this.page_title = 'Topics';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic(0, '')
    this.status = ''
  }

  ngOnInit(): void {
    this.getTopics()
  }

  onSubmit() {
    this._topicService.create(this.token, this.topic).subscribe(
      response => {
        if (response.status == 'success') {
          this.topic = new Topic(0, '')
          this.status = 'success'

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
