import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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
  imports: [IonicModule, CommonModule, FormsModule]
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

  constructor() {}

  refreshChat() {
    // Clear chat or reload messages
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
      // Add user message
      this.messages.push({
        text: this.newMessage,
        sender: 'user',
        time: this.getCurrentTime()
      });

      // Simulate AI response (replace with actual API call)
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

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}