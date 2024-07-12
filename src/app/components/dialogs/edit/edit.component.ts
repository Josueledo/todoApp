import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MatDialogModule,MatInput,ReactiveFormsModule,MatFormFieldModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  dialog = inject(MatDialog);
  constructor(public dialogRef: MatDialogRef<EditComponent>,private fb:FormBuilder) { }




  onYes(task: string){
    this.dialogRef.close(task)


  }
  onNo(){
    this.dialogRef.close()
  }
}
