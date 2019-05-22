import { Component, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as Stackedit from 'stackedit-js';

@Component({
    templateUrl: 'simpletexteditordialog.component.html'
})
export class SimpleTextEditorDialogComponent {
    content: string;
    filename: string;

    constructor(
        private dialogRef: MatDialogRef<SimpleTextEditorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.content = data.contents;
        this.filename = data.filename;
    }

    useStackEdit() {
        const stackedit = new Stackedit();
        stackedit.openFile({
            name: this.filename, // with a filename
            content: {
              text: this.content// and the Markdown content.
            }
        });
        stackedit.on('fileChange', (file) => {
            this.content = file.content.text;
        });
        stackedit.on('close', () => {
            this.save();
        });
    }

    cancel() {
        this.dialogRef.close();
    }

    save() {
        this.dialogRef.close(this.content);
    }
}
