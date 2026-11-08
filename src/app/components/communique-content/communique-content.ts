import { Component, inject, input, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommuniquesService } from '../communiques.service';

@Component({
  imports: [DatePipe],
  selector: 'app-communique-content',
  styleUrl: './communique-content.scss',
  templateUrl: './communique-content.html',
})
export class CommuniqueContent {
  id = input.required<string>()
  private readonly commService = inject(CommuniquesService)

  protected readonly comm = computed(() => 
    this.commService.communiquesList().find(c => c.id === Number(this.id()))
  )
}
