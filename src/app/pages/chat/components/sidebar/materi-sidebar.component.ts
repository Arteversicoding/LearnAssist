// Updated materi-sidebar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface MateriItem {
  id: string;
  title: string;
  date: string;
  type: 'pdf' | 'youtube' | 'word' | 'link' | 'text';
  selected?: boolean;
}

@Component({
  selector: 'app-materi-sidebar',
  templateUrl: './materi-sidebar.component.html',
  styleUrls: ['./materi-sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MateriSidebarComponent {
  @Input() isOpen = false;
  @Input() isDarkMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() toggleDarkMode = new EventEmitter<void>();
  @Output() addMateri = new EventEmitter<void>();
  @Output() searchMateri = new EventEmitter<string>();

  materiList: MateriItem[] = [
    { id: '1', title: 'PDF', date: 'Sabtu, 08 2025', type: 'pdf' },
    { id: '2', title: 'Youtube', date: 'Sabtu, 08 2025', type: 'youtube' },
    { id: '3', title: 'Word', date: 'Sabtu, 08 2025', type: 'word' },
    { id: '4', title: 'Link', date: 'Sabtu, 08 2025', type: 'link' }
  ];

  constructor() {}

  onClose() {
    this.close.emit();
  }

  onToggleDarkMode() {
    this.toggleDarkMode.emit();
  }

  onAddMateri() {
    this.addMateri.emit();
  }

  onSearchMateri() {
    this.searchMateri.emit('');
  }

  selectAll() {
    const allSelected = this.materiList.every(item => item.selected);
    this.materiList.forEach(item => {
      item.selected = !allSelected;
    });
  }

  toggleSelection(item: MateriItem) {
    item.selected = !item.selected;
  }

  get allSelected(): boolean {
    return this.materiList.every(item => item.selected);
  }

  getIconForType(type: string): string {
    switch (type) {
      case 'pdf':
        return 'assets/icon/pdf-logo.svg';
      case 'youtube':
        return 'assets/icon/youtube.svg';
      case 'word':
        return 'assets/icon/word.svg';
      case 'link':
        return 'assets/icon/link.svg';
      case 'text':
        return 'assets/icon/text.svg';
      default:
        return 'assets/icon/document.svg';
    }
  }
}