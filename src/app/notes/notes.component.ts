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
  selectedNotebook: Notebook;
  searchText: string;

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
    };

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

  getAllNotes() {
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
    if(confirm('¿Estás seguro de eliminar esta nota?')){
      this.apiService.deleteNote(note.id).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err => {
          alert ('Un error ha ocurrido durante el borrado de la nota.');
        }
      );
    }
  }

  createNote(notebookID: string) {
    let newNote: Note = {
      id: null,
      title: 'New Note',
      text: 'Escribe un breve texto aquí',
      lastModifiedOn: null,
      notebookId: notebookID
    };

    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      err => {
        alert('Ha ocurrido un error mientras se guardaba la nota');
      }
    );
  }

  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
    this.apiService.getNotesByNotebook(notebook.id).subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert('Un error ha ocurrido mientras se descargaban tus notes');
      }
    );
  }

  updateNote(updatedNote: Note) {
    this.apiService.saveNote(updatedNote).subscribe(
      res => {
      },
      err => {
        alert('Un error ha ocurrido mientras se descargaban')
      }
    );
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}
