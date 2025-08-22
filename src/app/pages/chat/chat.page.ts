import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { MateriSidebarComponent } from 'src/app/pages/chat/materi_sidebar.component/materi-sidebar.component';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  time: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    MateriSidebarComponent
  ]
})
export class ChatPage {
  messages: Message[] = [
    {
      text: 'Hello! How can I assist you today?',
      sender: 'ai',
      time: '10:00 AM'
    },
    {
      text: 'I need help with my project',
      sender: 'user',
      time: '10:01 AM'
    }
  ];

  newMessage: string = '';
  isSidebarOpen: boolean = false;
  isDarkMode: boolean = false;

  constructor() {
    addIcons({ personCircle });
  }

  refreshChat() {
    this.messages = [
      {
        text: 'Chat refreshed! How can I help you?',
        sender: 'ai',
        time: this.getCurrentTime()
      }
    ];
    this.newMessage = '';
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        sender: 'user',
        time: this.getCurrentTime()
      });

      setTimeout(() => {
        this.messages.push({
          text: 'I received your message: "' + this.newMessage + '"',
          sender: 'ai',
          time: this.getCurrentTime()
        });
      }, 1000);

      this.newMessage = '';
    }
  }

  openMateriSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  handleAddMateri() {
    console.log('Add materi clicked');
    alert('Tambah materi feature - akan buka file picker');
  }

  handleSearchMateri(searchTerm: string) {
    console.log('Search materi:', searchTerm);
    alert('Search materi feature - akan mencari: ' + searchTerm);
  }

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}