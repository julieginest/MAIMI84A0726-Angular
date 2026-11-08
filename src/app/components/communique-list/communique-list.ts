import { Component, inject } from '@angular/core';
import { CommuniqueCard } from '../communique-card/communique-card';
import { CommuniquesService } from '../communiques.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  imports: [CommuniqueCard, RouterLink],
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

  protected onDelete(commId: number): void {
    this.commService.deleteComm(commId)
  }

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      this.lastSlugSegment = urlSegments[urlSegments.length - 1].path;
    });
  }

  protected readonly comms = this.commService.communiquesList;
  protected readonly loading = this.commService.loading;
  protected readonly error = this.commService.error;
}
