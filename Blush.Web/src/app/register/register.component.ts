import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @Input() usersDataFromParent: any; 
  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  constructor(private accountService: AccountService) {}

  ngOnInit() {}

  register() {
    this.accountService.registerUser(this.model)
        .subscribe(response => {
          console.log("Response from register component = " + JSON.stringify(response));
          this.cancel();
        },  error => {
          console.log(error);
        });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
