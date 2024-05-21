import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { MembersCardComponent } from '../members-card/members-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MembersCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{

	members: Member[] = [];

    constructor(private memberService: MembersService) { }

	ngOnInit() {
		this.loadMembers();
	}

    loadMembers() {
    	this.memberService.getMembers()
    		.subscribe((data: Member[]) => {
				this.members = data;
        });
    }
}
