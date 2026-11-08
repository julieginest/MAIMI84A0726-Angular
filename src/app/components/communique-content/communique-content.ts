import { Component, inject, input, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommuniquesService } from '../communiques.service';
import { marked } from 'marked';
import { RouterLink } from '@angular/router';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-communique-content',
  styleUrl: './communique-content.scss',
  templateUrl: './communique-content.html',
})
export class CommuniqueContent {
  id = input.required<string>()
  private readonly commService = inject(CommuniquesService)

  protected readonly loading = this.commService.loading;
  protected readonly error = this.commService.error;


  protected readonly parsed = computed(() => {
    const c = this.commService.communiquesList().find(c => c.slug === this.id())
    return marked.parse(c?.content ?? "")
  })

  protected readonly comm = computed(() =>
    this.commService.communiquesList().find(c => c.slug === this.id())
  )
}
