import { Component, inject } from '@angular/core';
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
  private readonly fb = inject(FormBuilder)
  private readonly commService = inject(CommuniquesService)
  private readonly router = inject(Router)

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
    if(false){

    }else{
      this.commService.addComm({title, image, content}).subscribe(()=>{
        this.router.navigate(['/'])
      })
    }
  }
}
