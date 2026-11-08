import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Communique from '../types/communique';


@Service()
export class CommuniquesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:3000/communiques"
  
  private readonly communiquesSignal = signal<Communique[]>([])
  
  readonly communiquesList = this.communiquesSignal.asReadonly();

  constructor(){
    this.loadCommuniques();
  }

  loadCommuniques() : void {
    this.http.get<Communique[]>(this.apiUrl).subscribe(communiques => {
      this.communiquesSignal.set(communiques)
    })
  }
}
