import { Component, inject } from '@angular/core';
import { CommuniqueCard } from '../communique-card/communique-card';
import { CommuniquesService } from '../communiques.service';

@Component({
  imports: [CommuniqueCard],
  selector: 'app-communique-list',
  styleUrl: './communique-list.scss',
  templateUrl: './communique-list.html',
})
export class CommuniqueList {
  private readonly commService = inject(CommuniquesService);

  protected readonly comms = this.commService.communiquesList;
}
