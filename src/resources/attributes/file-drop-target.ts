import {autoinject, customAttribute, bindingMode} from 'aurelia-framework';
import {log, cn} from '../logger';

@customAttribute('file-drop-target', bindingMode.twoWay)
@autoinject
export class FileDropTarget {

  value: FileList;
  _onDragOver: (e: DragEvent) => void;
  _onDrop: (e: DragEvent) => void;
  _onDragEnd: (e: DragEvent) => void;

  constructor(private element: Element) {
    cn(this);
    this._onDragOver = this.onDragOver.bind(this);
    this._onDrop = this.onDrop.bind(this);
    this._onDragEnd = this.onDragEnd.bind(this);
   }

  attached() {
    this.element.addEventListener('dragover', this._onDragOver);
    this.element.addEventListener('drop', this._onDrop);
    this.element.addEventListener('dragend', this._onDragEnd);
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.value = e.dataTransfer.files;
  }

  onDragEnd(e: DragEvent) {
    e.dataTransfer.clearData();
  }

  detached() {
    this.element.removeEventListener('dragover', this._onDragOver);
    this.element.removeEventListener('drop', this._onDrop);
    this.element.removeEventListener('dragend', this._onDragEnd);
  }
}

