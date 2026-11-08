import { Component, inject } from '@angular/core';
import { CommuniqueCard } from '../communique-card/communique-card';
import { CommuniquesService } from '../communiques.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [CommuniqueCard],
  selector: 'app-communique-list',
  styleUrl: './communique-list.scss',
  templateUrl: './communique-list.html',
})
export class CommuniqueList {
  private readonly commService = inject(CommuniquesService);
  lastSlugSegment=''
  isA:boolean=this.lastSlugSegment=="a"
  
  protected onToggleVisibility(commId: number): void {
    this.commService.toggleVisibility(commId)
  }

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      this.lastSlugSegment = urlSegments[urlSegments.length - 1].path;
    });
  }

  protected readonly comms = this.commService.communiquesList;
}
