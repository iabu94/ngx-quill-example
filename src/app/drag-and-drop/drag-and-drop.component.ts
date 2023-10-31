import { CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { EditorChangeContent, EditorChangeSelection } from "ngx-quill";
import Quill from "quill";

@Component({
  selector: "app-drag-and-drop",
  templateUrl: "./drag-and-drop.component.html",
  styles: [
    `
      .example-list {
        width: 500px;
        max-width: 100%;
        border: solid 1px #ccc;
        min-height: 60px;
        display: block;
        background: white;
        border-radius: 4px;
        overflow: hidden;
      }

      .example-box {
        padding: 20px 10px;
        border-bottom: solid 1px #ccc;
        color: rgba(0, 0, 0, 0.87);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        cursor: move;
        background: white;
        font-size: 14px;
      }

      .cdk-drag-preview {
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
          0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      .cdk-drag-placeholder {
        opacity: 0;
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      .example-box:last-child {
        border: none;
      }

      .example-list.cdk-drop-list-dragging
        .example-box:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class DragAndDropComponent {
  blurred = false;
  focused = false;
  editorFormControl = new FormControl(null, Validators.required);
  items = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  selectAllText() {
    const button = document.querySelector('button'); // Replace with a more specific selector if necessary
    if (button) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(button);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  

  onDragStart(event: CdkDragStart) {
    console.log(event.source.element.nativeElement.innerText);

    // event.preventDefault();
    // event.dataTransfer?.setData('text/plain', "TEST" || '');
  }

  created(event: Quill) {
    // tslint:disable-next-line:no-console
    console.log("editor-created", event);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log("editor-change", event);
  }

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log("focus", $event);
    this.focused = true;
    this.blurred = false;
  }
  nativeFocus($event) {
    // tslint:disable-next-line:no-console
    console.log("native-focus", $event);
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log("blur", $event);
    this.focused = false;
    this.blurred = true;
  }
  nativeBlur($event) {
    // tslint:disable-next-line:no-console
    console.log("native-blur", $event);
  }
}
