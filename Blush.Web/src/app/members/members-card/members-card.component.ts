import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-members-card',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './members-card.component.html',
	styleUrl: './members-card.component.css'
})
export class MembersCardComponent implements OnInit{

	@Input() member: Member | undefined ;

	constructor() {}

	ngOnInit(): void {
		
	}
	
}
