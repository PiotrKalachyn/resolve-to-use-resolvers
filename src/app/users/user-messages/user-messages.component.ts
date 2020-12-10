import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {
user: User;
  constructor(    private route: ActivatedRoute,
) { }

  ngOnInit() {
        this.user = this.route.snapshot?.data?.user;

  }

}