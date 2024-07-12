import { taskInterface } from './../../interfaces/task.interface';
import { MatIcon } from '@angular/material/icon';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../dialogs/create/create.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { EditComponent } from '../dialogs/edit/edit.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIcon, CommonModule, CdkDrag, CdkDropList, DragDropModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  data = new Date();
  dayName: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  monthName: string[] = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  totalDays: number = 0;
  listDays: any = [];
  day: number = this.data.getDate();
  readonly dialog = inject(MatDialog);

  delete: any[] = [];
  listTasks: any[] = [];
  edit: any[] = [];

  ngOnInit() {
    this.getDays();
    this.getTasks();
    this.alignDays();
  }
  getDays() {
    this.totalDays = new Date(
      this.data.getFullYear(),
      this.data.getMonth() + 1,
      0
    ).getDate();
    for (let i = 0; this.totalDays > i; i++) {
      let obj = {
        day: i + 1,
        dayName:
          this.dayName[
            new Date(
              this.data.getFullYear(),
              this.data.getMonth(),
              i + 1
            ).getDay()
          ],
      };
      this.listDays.push(obj);
    }
  }
  changeDay($event: any) {
    this.day = $event;
    this.alignDays();
  }

  openDialog() {
    this.dialog
      .open(CreateComponent)
      .afterClosed()
      .subscribe((data: string) => {
        let dataObj = {
          id: 0,
          content: data,
          data: this.day,
          status: false,
        } as any;
        if (data === '' || data === undefined) {
          this.getTasks()
          return;
        }else{
          this.onCreate(dataObj);
        }
      });
  }

  alignDays() {
    const daysContainer =
      document.querySelector<HTMLElement>('.daysContainer')!;
    if (this.day > 3 && this.day < this.totalDays - 3) {
      daysContainer.scrollLeft = this.day * 80 - 260;
    }
  }
  ngAfterViewInit() {
    this.alignDays();
  }

  getTasks() {
    const localData = localStorage.getItem('tasks');
    if (localData != null) {
      this.listTasks = JSON.parse(localData);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (this.delete.length > 0) {
      console.log(this.listTasks);
      this.onDelete();
    } else if (this.edit.length > 0) {
      this.editDialog();
    }
  }
  changeStatus(id: number, $event: any) {
    const taskIndex = this.listTasks.findIndex((m) => m.id === id);
    let currentTask = this.listTasks[taskIndex];

    currentTask.status = !currentTask.status;
    console.log($event.target.parentElement);
    if (!currentTask.status) {
      $event.target.style = 'background: rgb(227, 39, 22)';
      $event.target.parentElement.style =     "border: 2px solid rgb(227, 39, 22)"

    } else {
      $event.target.style = 'background: rgb(114, 218, 82)';
      $event.target.parentElement.style =     "border: 2px solid rgb(114, 218, 82)"
    }
  }

  editDialog() {
    this.dialog
      .open(EditComponent)
      .afterClosed()
      .subscribe((data) => {
        console.log(data)
        if (data === '' || data === undefined) {
          this.getTasks()
          return;
        } else {
          this.onEdit({
            id: this.edit[0].id,
            content: data,
            data: this.edit[0].data,
            status: this.edit[0].status,
          });
        }
      });
  }
  onEdit(task: taskInterface) {
    this.listTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.listTasks));
    this.edit = [];
  }
  onDelete() {
    localStorage.setItem('tasks', JSON.stringify(this.listTasks));
    this.delete = [];
  }
  onCreate(task: taskInterface) {
    const localPresent = localStorage.getItem('tasks') as any;

    if (localPresent != null) {
      const oldArr: any[] = JSON.parse(localPresent);
      oldArr.push(task);
      task.id = oldArr.length + 1;
      localStorage.setItem('tasks', JSON.stringify(oldArr));
    } else {
      const newArr: any[] = [];
      newArr.push(task);
      task.id = 1;
      localStorage.setItem('tasks', JSON.stringify(newArr));
    }
    this.getTasks();
    console.log(localStorage.getItem('tasks'));
  }
}
