// materi-sidebar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface MateriItem {
  id: string;
  title: string;
  date: string;
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
    { id: '1', title: 'Uji kopetensi 1', date: 'Sabtu, 08 2025' },
    { id: '2', title: 'Uji kopetensi 2', date: 'Sabtu, 09 2025' },
    { id: '3', title: 'Uji kopetensi 3', date: 'Sabtu, 10 2025' },
    { id: '4', title: 'Uji kopetensi 4', date: 'Sabtu, 11 2025' },
    { id: '5', title: 'Uji kopetensi 5', date: 'Sabtu, 12 2025' }
  ];

  constructor() {
    // No need for addIcons anymore since we'll use custom SVG
  }

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
}