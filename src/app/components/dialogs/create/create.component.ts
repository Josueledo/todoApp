import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule,DialogModule,MatFormFieldModule,MatDialogActions,MatDialogContent,MatInput],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  dialog = inject(MatDialog);
  constructor(public dialogRef: MatDialogRef<CreateComponent>,private fb:FormBuilder) { }




  onYes(task: string){
    this.dialogRef.close(task)


  }
  onNo(){
    this.dialogRef.close()
  }
}
