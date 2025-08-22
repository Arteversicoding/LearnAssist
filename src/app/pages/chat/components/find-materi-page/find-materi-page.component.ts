// find-materi-page.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface MateriItem {
  id: string;
  title: string;
  date: string;
  type: 'pdf' | 'youtube' | 'word' | 'link' | 'text';
  selected?: boolean;
}

@Component({
  selector: 'app-find-materi-page',
  templateUrl: './find-materi-page.component.html',
  styleUrls: ['./find-materi-page.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class FindMateriPageComponent {
  @Input() isOpen = false;
  @Input() isDarkMode = false;
  @Output() close = new EventEmitter<void>();

  searchTerm: string = '';
  filteredMaterials: MateriItem[] = [];
  allMaterials: MateriItem[] = [
    { id: '1', title: 'Uji Kompetensi 1', date: 'Sabtu, 08 2025', type: 'pdf' },
    { id: '2', title: 'Video Pembelajaran Matematika', date: 'Minggu, 09 2025', type: 'youtube' },
    { id: '3', title: 'Materi PPKN Bab 1', date: 'Senin, 10 2025', type: 'word' },
    { id: '4', title: 'Link Pembelajaran Online', date: 'Selasa, 11 2025', type: 'link' },
    { id: '5', title: 'Catatan Kuliah Fisika', date: 'Rabu, 12 2025', type: 'text' }
  ];

  constructor() {
    this.filteredMaterials = [...this.allMaterials];
  }

  onClose() {
    this.close.emit();
  }

  onSearchInput() {
    if (this.searchTerm.trim() === '') {
      this.filteredMaterials = [...this.allMaterials];
    } else {
      this.filteredMaterials = this.allMaterials.filter(material =>
        material.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  onSearchSubmit() {
    this.onSearchInput();
  }

  selectMaterial(material: MateriItem) {
    material.selected = !material.selected;
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

  clearSearch() {
    this.searchTerm = '';
    this.filteredMaterials = [...this.allMaterials];
  }
}