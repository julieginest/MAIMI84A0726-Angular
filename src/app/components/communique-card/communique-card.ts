import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import Communique from '../../types/communique';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-communique-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './communique-card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './communique-card.scss',
})
export class CommuniqueCard {
  comm = input.required<Communique>();
  isA = input.required<boolean>();
  toggleVisibility = output<number>();
  
  protected onToggleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.toggleVisibility.emit(this.comm().id)
  }
}
