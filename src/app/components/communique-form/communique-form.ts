import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommuniquesService } from '../communiques.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-communique-form',
  styleUrl: './communique-form.scss',
  templateUrl: './communique-form.html',
})
export class CommuniqueForm {

  constructor(){
    effect(() =>{
      if(this.currentComm() && this.commForm.pristine){
        this.commForm.patchValue({
          title: this.currentComm()?.title,
          content: this.currentComm()?.content,
          image: this.currentComm()?.image,
        })
      }
    })
  }

  id = input<string>();


  
  
  private readonly fb = inject(FormBuilder)
  private readonly commService = inject(CommuniquesService)
  private readonly router = inject(Router)

  protected readonly loading = this.commService.loading;
  protected readonly error = this.commService.error;
  private readonly submitError = signal<string | null>(null);

  protected readonly editionMode = computed(() => this.id() != undefined);
  protected readonly currentComm = computed(() => 
    this.editionMode()
      ? this.commService.communiquesList().find(c => c.id == Number(this.id()))
      : undefined
  )

  protected readonly commForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.pattern(/^\w+( +\w\+-+)*$/)]],
    image: [''],
    content: ['', [Validators.required]],
  })

  protected onSubmit() : void{
    if(this.commForm.invalid){
      this.commForm.markAllAsTouched();
      return
    }
    
    const {title, image, content} = this.commForm.getRawValue();
    const id = this.id()
    if(id){
      this.commService.updateComm(Number(id),{title, content, image})
      this.router.navigate(['/','a']);
    }else{
      this.commService.addComm({title, image, content})
      this.router.navigate(['/','a'])
    }
  }

  
}
