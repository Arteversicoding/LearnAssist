import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage {
  
  constructor(private router: Router) {}

  goToChat() {
    console.log('Button chat clicked!');
    // FIXED: Navigation tanpa tabs
    this.router.navigate(['/chat']);
  }

  goToMateri() {
    console.log('Button materi clicked!');
    // FIXED: Navigation tanpa tabs
    this.router.navigate(['/materi']);
  }
}