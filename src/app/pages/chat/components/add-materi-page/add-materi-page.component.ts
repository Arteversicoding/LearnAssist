// add-materi-page.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';

interface MateriData {
  id: string;
  title: string;
  content: string;
  type: 'pdf' | 'youtube' | 'word' | 'link' | 'text';
  url?: string;
}

@Component({
  selector: 'app-add-materi-page',
  templateUrl: './add-materi-page.component.html',
  styleUrls: ['./add-materi-page.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class AddMateriPageComponent {
  @Input() isOpen = false;
  @Input() isDarkMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() materiAdded = new EventEmitter<MateriData>();

  selectedFiles: File[] = [];
  linkUrl: string = '';
  copyText: string = '';

  constructor(private alertController: AlertController) {}

  onClose() {
    this.close.emit();
  }

  // File Upload Methods
  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles.push(...files);
    
    files.forEach(file => {
      this.processFile(file);
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    const files = Array.from(event.dataTransfer?.files || []);
    this.selectedFiles.push(...files);
    
    files.forEach(file => {
      this.processFile(file);
    });
  }

  private processFile(file: File) {
    let type: 'pdf' | 'word' | 'text' = 'text';
    
    if (file.type === 'application/pdf') {
      type = 'pdf';
    } else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      type = 'word';
    }

    const materi: MateriData = {
      id: this.generateId(),
      title: file.name,
      content: `File: ${file.name}`,
      type: type
    };

    this.materiAdded.emit(materi);
    this.showSuccessAlert(`File "${file.name}" berhasil ditambahkan!`);
  }

  // Google Drive Methods
  async connectGoogleDocs() {
    const alert = await this.alertController.create({
      header: 'Google Docs',
      message: 'Fitur integrasi Google Docs akan segera tersedia!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async connectGoogleSlides() {
    const alert = await this.alertController.create({
      header: 'Google Slides',
      message: 'Fitur integrasi Google Slides akan segera tersedia!',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Link Methods
  async addLink() {
    const alert = await this.alertController.create({
      header: 'Tambah Link',
      inputs: [
        {
          name: 'url',
          type: 'url',
          placeholder: 'Masukkan URL (website/YouTube)',
          value: this.linkUrl
        },
        {
          name: 'title',
          type: 'text',
          placeholder: 'Judul materi (opsional)'
        }
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Tambah',
          handler: (data) => {
            if (data.url) {
              this.processLink(data.url, data.title);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  private processLink(url: string, title?: string) {
    let type: 'link' | 'youtube' = 'link';
    let finalTitle = title || 'Link Material';

    // Check if YouTube URL
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      type = 'youtube';
      finalTitle = title || 'Video YouTube';
    }

    const materi: MateriData = {
      id: this.generateId(),
      title: finalTitle,
      content: url,
      type: type,
      url: url
    };

    this.materiAdded.emit(materi);
    this.showSuccessAlert(`${type === 'youtube' ? 'Video YouTube' : 'Link'} "${finalTitle}" berhasil ditambahkan!`);
  }

  // Copy Text Method
  async addCopyText() {
    const alert = await this.alertController.create({
      header: 'Tambah Teks',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Judul materi'
        },
        {
          name: 'content',
          type: 'textarea',
          placeholder: 'Paste atau ketik teks materi di sini...'
        }
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Tambah',
          handler: (data) => {
            if (data.content && data.title) {
              this.processCopyText(data.title, data.content);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  private processCopyText(title: string, content: string) {
    const materi: MateriData = {
      id: this.generateId(),
      title: title,
      content: content,
      type: 'text'
    };

    this.materiAdded.emit(materi);
    this.showSuccessAlert(`Teks "${title}" berhasil ditambahkan!`);
  }

  private async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Berhasil!',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  private generateId(): string {
    return 'materi_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // File input trigger
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}