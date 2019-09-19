import { Component, OnInit } from '@angular/core';
import { Notebook } from './model/notebook';
import { ApiService } from '../shared/api.service';
import { Note } from './model/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  getAllNotebooks() {
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert('Un error ha ocurrido');
      }
    );
  }

  createNotebook() {
    let newNotebook: Notebook = {
      name: 'New notebook',
      id: null,
      nbOfNotes: 0
    }

    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        //colocamos el id que esta viniendo del servidor
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => { alert('Un error ha ocurrido mientras se guardaba el Notebook'); }
    );
  }

  updateNotebook(updatedNotebook: Notebook) {
    this.apiService.postNotebook(updatedNotebook).subscribe(
      res => {
      },
      err => { alert('Un error ha ocurrido mientras se guardaba el Notebook'); }
    );
  }

  deleteNotebook(notebook: Notebook) {
    if (confirm('¿Estás seguro de eliminar la nota?')) {
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        },
        err => { alert('No se pudo eliminar el notebook.'); }
      );
    }
  }

  getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert('Ocurrio un error mientras se obtenían las notas.');
      }
    );
  }

  deleteNote(note: Note) {

  }
}
