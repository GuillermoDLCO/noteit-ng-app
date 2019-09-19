import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  model: FeedBackViewModel = {
    name: '',
    email: '',
    feedback: ''
  };
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  sendFeedback(): void {
    this.apiService.postFeedback(this.model).subscribe(
      res => {
        location.reload();
      },
      err => {
        alert('Ha ocurrido un error mientras se enviaba el feedback');
      }
    )
  }
}

export interface FeedBackViewModel{
  name: string;
  email: string;
  feedback: string;
}
