import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Photo } from '../../_models/photo';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [CommonModule, TabsModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css',
})
export class MemberDetailsComponent implements OnInit {
  member!: Member;

  userImages: Photo[] = [];
  images: string[] = [];
  currentImage: string = "";

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute
  ) {
    // this.images.push("https://images.unsplash.com/photo-1559038465-e0ca2910a5b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    // this.images.push("https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1830&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    // this.images.push("https://images.unsplash.com/photo-1544986342-f4f2e11b7c02?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    // this.images.push("https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D");
    // if(this.images.length > 0) {
    //   this.currentImage = this.images[0];
    // }
  }

  ngOnInit(): void {
    this.loadMember();
  }

  showCaseImage(imageSrc: string) {
    this.currentImage = imageSrc;
  }

  loadMember() {
    let username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.memberService
        .getMemberByUsername(username)
        .subscribe((memberData) => {
          this.member = memberData;
          // Collecting the user pictures and assigning current picture
          this.userImages = this.member.photos;
          this.currentImage = this.userImages[0].url;
        });
    }
  }
}
