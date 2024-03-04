import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  constructor() {}

  ngOnInit() {}

  register() {
    console.log(this.model);
  }

  resetForm() {
    this.cancelRegister.emit(false);
  }
}
