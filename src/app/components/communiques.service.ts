import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Communique from '../types/communique';
import { tap } from 'rxjs';
import CommuniqueUpdate from '../types/communique-update';


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

  addComm(comm: Omit<Communique,'id' | 'createdAt' | 'visible' | 'slug'>) {
    const id = Math.max(0, ...this.communiquesList().map(c => c.id))+1;
    const slug = comm.title.replaceAll(" ","-")
    const newComm : Communique = {
      ...comm,
      id,
      createdAt: new Date().toISOString(),
      visible: false,
      slug
    }
    return this.http.post<Communique>(this.apiUrl, newComm).pipe(
      tap(
        c => this.communiquesSignal.update(comm => [...comm, c])
      )
    )
  }

  updateComm(commId: number, comm: CommuniqueUpdate){
    return this.http
      .patch<Communique>(`${this.apiUrl}/${commId}`, comm)
      .subscribe({
        next: u => {
          this.communiquesSignal.update(comms => comms.map(c => (c.id === commId ? u : c)))
        }
      })
  }

  toggleVisibility(commId: number) : void {
    const comm = this.communiquesSignal().find(c => c.id == commId);
    if (!comm) return;
    const visible = !comm.visible
    this.updateComm(commId, {visible:visible})
  }
}
