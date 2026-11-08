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
  private readonly loadingSignal = signal(true);
  private readonly errorSignal = signal<string | null>(null);
  
  readonly communiquesList = this.communiquesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor(){
    this.loadCommuniques();
  }

  private resetStates() : void {
    this.loadingSignal.set(true)
    this.errorSignal.set(null)
  }

  loadCommuniques() : void {
    this.resetStates()

    this.http.get<Communique[]>(this.apiUrl).subscribe({
      next: c => {
        this.communiquesSignal.set(c);
        this.loadingSignal.set(false)
      },
      error: () => {
        this.errorSignal.set("Loading failed. Check api URL")
        this.loadingSignal.set(false)
      }
    })
  }

  addComm(comm: Omit<Communique,'id' | 'createdAt' | 'visible' | 'slug'>) {
    this.resetStates()

    const id = Math.max(0, ...this.communiquesList().map(c => c.id))+1;
    const slug = comm.title.replaceAll(" ","-")
    const newComm : Communique = {
      ...comm,
      id,
      createdAt: new Date().toISOString(),
      visible: false,
      slug
    }
    return this.http.post<Communique>(this.apiUrl, newComm).subscribe({
      next: c => {
        this.communiquesSignal.update(comm => [...comm, c])
        this.loadingSignal.set(false)
      },
      error: () => {
        this.errorSignal.set("Could not create. Check api URL")
        this.loadingSignal.set(false)
      }
    })
  }

  updateComm(commId: number, comm: CommuniqueUpdate){
    this.resetStates()

    return this.http
      .patch<Communique>(`${this.apiUrl}/${commId}`, comm)
      .subscribe({
        next: u => {
          this.communiquesSignal.update(comms => comms.map(c => (c.id === commId ? u : c)))
          this.loadingSignal.set(false)
        },
        error: () => {
          this.errorSignal.set("Could not update. Check api URL")
          this.loadingSignal.set(false)
      }
      })
  }

  toggleVisibility(commId: number) : void {
    const comm = this.communiquesSignal().find(c => c.id == commId);
    if (!comm) return;
    const visible = !comm.visible
    this.updateComm(commId, {visible:visible})
  }

  deleteComm(id: number): void {
    this.resetStates()

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.communiquesSignal.update(comms => comms.filter(c => c.id !== id));
        this.loadingSignal.set(false)
      },
      error: () => {
        this.errorSignal.set("Could not delete. Check api URL.");
        this.loadingSignal.set(false)
      },
    })
  }

}
