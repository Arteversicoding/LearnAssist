import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-materi',
  templateUrl: './materi.page.html',
  styleUrls: ['./materi.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class MateriPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async pickFile() {
    try {
      const result = await FilePicker.pickFiles({
        types: ['application/pdf'],
      });

      if (result.files.length > 0) {
        const file = result.files[0];
        console.log('File picked:', file);
        // Next step: Upload this file to your backend server
      }
    } catch (e) {
      console.error('Error picking file', e);
    }
  }

}
