import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-member-edit',
	standalone: true,
	imports: [CommonModule, TabsModule, FormsModule],
	templateUrl: './member-edit.component.html',
	styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
	@ViewChild('editForm') editFormViewChild!: NgForm;
	
	member!: Member;
	user!: User;

	@HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
		if($event.editFormViewChild.dirty) {
			$event.returnValue = true;
		}
	}

	constructor(
		private accountService: AccountService, 
		private memberService: MembersService,
		private toastr: ToastrService) {
		this.accountService.currentUser$
			.pipe(take(1))
			.subscribe(userData => {
				this.user = userData;
			});
	}

	ngOnInit() {
		this.loadMember();
	}

	loadMember() {
		this.memberService.getMemberByUsername(this.user.username)
			.subscribe(memberData => {
				this.member = memberData;
			})
	}

	updateMember() {
		this.memberService.updateMember(this.member)
			.subscribe(() => {
				this.toastr.success('Profile updated successfully.');
				this.editFormViewChild.reset(this.member);
			})
		
	}

	

}
