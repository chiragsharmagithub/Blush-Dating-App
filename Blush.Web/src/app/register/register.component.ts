import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  model: any = {};
  constructor() {}

  ngOnInit() {
    
  }

  register() {
    console.log(this.model);
  }

  resetForm() {
    console.log("Cancelled");
  }
}
