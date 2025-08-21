import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';   // 👈 tambahkan ini
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]  // 👈 tambahkan ini
})
export class HomePage {}
