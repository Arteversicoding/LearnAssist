// chat.page.ts - Fixed TypeScript errors
import { Component, ViewChild, ElementRef, AfterViewChecked, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ActionSheetController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personCircle, attach, camera, image, document as documentIcon } from 'ionicons/icons';
import { MateriSidebarComponent } from './components/sidebar/materi-sidebar.component';
import { AddMateriPageComponent } from './components/add-materi-page/add-materi-page.component';
import { FindMateriPageComponent } from './components/find-materi-page/find-materi-page.component';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  time: string;
  type?: 'text' | 'file' | 'image';
  fileName?: string;
  fileUrl?: string;
  isTyping?: boolean;
}

interface MateriData {
  id: string;
  title: string;
  content: string;
  type: 'pdf' | 'youtube' | 'word' | 'link' | 'text';
  url?: string;
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
    MateriSidebarComponent,
    AddMateriPageComponent,
    FindMateriPageComponent
  ]
})
export class ChatPage implements AfterViewChecked {
  @ViewChild('chatContainer', { read: ElementRef }) chatContainer!: ElementRef;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  messages: Message[] = [
    {
      text: 'Halo! Saya LearnAssist (LA), asisten belajar Anda. Silakan upload materi terlebih dahulu melalui sidebar, lalu Anda bisa bertanya tentang materi tersebut! 📚',
      sender: 'ai',
      time: this.getCurrentTime(),
      type: 'text'
    }
  ];

  newMessage: string = '';
  isSidebarOpen: boolean = false;
  isAddMateriOpen: boolean = false;
  isFindMateriOpen: boolean = false;
  isDarkMode: boolean = false;
  materiData: MateriData[] = [];
  isTyping: boolean = false;

  // AI responses based on context
  private aiResponses = {
    noMateri: [
      'Maaf, saya belum memiliki materi untuk menjawab pertanyaan Anda. Silakan upload materi terlebih dahulu melalui sidebar! 📖',
      'Saya tidak bisa menjawab tanpa materi yang relevan. Tolong tambahkan materi dulu ya! 📝',
      'Sepertinya belum ada materi yang tersedia. Upload materi dulu supaya saya bisa membantu! 📚'
    ],
    greetings: [
      'Halo! Ada yang bisa saya bantu tentang materi pembelajaran Anda? 😊',
      'Hi! Silakan tanyakan apa saja tentang materi yang sudah Anda upload! 👋',
      'Halo! Saya siap membantu Anda belajar dari materi yang tersedia! 🤝'
    ],
    thanks: [
      'Sama-sama! Senang bisa membantu Anda belajar! 😊',
      'Dengan senang hati! Ada pertanyaan lain tentang materi? 🤗',
      'Tidak masalah! Saya di sini untuk membantu pembelajaran Anda! 💪'
    ],
    contextBased: [
      'Berdasarkan materi yang Anda berikan, saya dapat menjelaskan bahwa...',
      'Menurut informasi dari materi Anda...',
      'Dari materi yang telah diupload, dapat saya sampaikan bahwa...'
    ]
  };

  constructor(
    private actionSheetController: ActionSheetController,
    @Inject(DOCUMENT) private document: Document
  ) {
    addIcons({ personCircle, attach, camera, image, document: documentIcon });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch(err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  refreshChat() {
    this.messages = [
      {
        text: 'Chat telah di-refresh! Apakah ada yang ingin Anda tanyakan tentang materi? 🔄',
        sender: 'ai',
        time: this.getCurrentTime(),
        type: 'text'
      }
    ];
    this.newMessage = '';
  }

  async sendMessage() {
    if (this.newMessage.trim()) {
      // Add user message
      const userMessage: Message = {
        text: this.newMessage,
        sender: 'user',
        time: this.getCurrentTime(),
        type: 'text'
      };
      this.messages.push(userMessage);

      const userInput = this.newMessage.toLowerCase();
      this.newMessage = '';

      // Show typing indicator
      this.showTypingIndicator();

      // Simulate AI processing time
      setTimeout(() => {
        this.hideTypingIndicator();
        const aiResponse = this.generateAIResponse(userInput, userMessage.text);
        this.messages.push(aiResponse);
      }, Math.random() * 2000 + 1000); // 1-3 seconds delay
    }
  }

  private showTypingIndicator() {
    this.isTyping = true;
    this.messages.push({
      text: 'LA sedang mengetik...',
      sender: 'ai',
      time: this.getCurrentTime(),
      type: 'text',
      isTyping: true
    });
  }

  private hideTypingIndicator() {
    this.isTyping = false;
    this.messages = this.messages.filter(msg => !msg.isTyping);
  }

  private generateAIResponse(userInput: string, originalText: string): Message {
    let responseText = '';

    // Check for greetings
    if (this.isGreeting(userInput)) {
      responseText = this.getRandomResponse(this.aiResponses.greetings);
    }
    // Check for thanks
    else if (this.isThanking(userInput)) {
      responseText = this.getRandomResponse(this.aiResponses.thanks);
    }
    // Check if user asks about material but no material uploaded
    else if (this.materiData.length === 0) {
      responseText = this.getRandomResponse(this.aiResponses.noMateri);
    }
    // Generate context-based response
    else {
      responseText = this.generateContextResponse(originalText);
    }

    return {
      text: responseText,
      sender: 'ai',
      time: this.getCurrentTime(),
      type: 'text'
    };
  }

  private isGreeting(input: string): boolean {
    const greetingWords = ['halo', 'hai', 'hello', 'hi', 'selamat', 'pagi', 'siang', 'sore', 'malam'];
    return greetingWords.some(word => input.includes(word));
  }

  private isThanking(input: string): boolean {
    const thankWords = ['terima kasih', 'thanks', 'thank you', 'makasih', 'thx'];
    return thankWords.some(word => input.includes(word));
  }

  private generateContextResponse(userText: string): string {
    if (this.materiData.length > 0) {
      // Simulate context-aware response based on uploaded materials
      const baseResponse = this.getRandomResponse(this.aiResponses.contextBased);
      const emojis = ['📖', '📝', '💡', '🔍', '📚', '✨', '🎯', '💭'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      return `${baseResponse} [Simulasi jawaban berdasarkan materi "${this.materiData[0].title}"] ${randomEmoji}`;
    } else {
      return this.getRandomResponse(this.aiResponses.noMateri);
    }
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  async presentAttachmentOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Pilih Attachment',
      buttons: [
        {
          text: 'Kamera',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Galeri',
          icon: 'image',
          handler: () => {
            this.selectImage();
          }
        },
        {
          text: 'Dokumen',
          icon: 'document',
          handler: () => {
            this.selectDocument();
          }
        },
        {
          text: 'Batal',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  takePhoto() {
    // Simulate camera functionality
    console.log('Taking photo...');
    this.addFileMessage('📷 Foto dari kamera', 'image', 'camera_photo.jpg');
  }

  selectImage() {
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.accept = 'image/*';
      this.fileInput.nativeElement.click();
    }
  }

  selectDocument() {
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.accept = '.pdf,.doc,.docx,.txt';
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.addFileMessage(`📎 ${file.name}`, 'file', file.name, URL.createObjectURL(file));
      
      // AI response to file upload
      setTimeout(() => {
        const responses = [
          `Saya melihat Anda mengirim file "${file.name}". Apakah ini materi yang ingin dibahas? 📝`,
          `File "${file.name}" telah diterima! Silakan tambahkan ke materi melalui sidebar jika ingin saya pelajari. 📚`,
          `Terima kasih sudah mengirim "${file.name}". Untuk pembahasan detail, silakan upload sebagai materi ya! 📖`
        ];
        this.messages.push({
          text: this.getRandomResponse(responses),
          sender: 'ai',
          time: this.getCurrentTime(),
          type: 'text'
        });
      }, 1000);
    }
  }

  private addFileMessage(text: string, type: 'file' | 'image', fileName: string, fileUrl?: string) {
    this.messages.push({
      text: text,
      sender: 'user',
      time: this.getCurrentTime(),
      type: type,
      fileName: fileName,
      fileUrl: fileUrl
    });
  }

  openMateriSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  openAddMateri() {
    this.isAddMateriOpen = true;
    this.isSidebarOpen = false;
  }

  closeAddMateri() {
    this.isAddMateriOpen = false;
  }

  openFindMateri() {
    this.isFindMateriOpen = true;
    this.isSidebarOpen = false;
  }

  closeFindMateri() {
    this.isFindMateriOpen = false;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.document?.body) {
      this.document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  }

  handleAddMateri() {
    this.openAddMateri();
  }

  handleSearchMateri(searchTerm: string) {
    this.openFindMateri();
  }

  handleMateriAdded(materi: MateriData) {
    this.materiData.push(materi);
    this.closeAddMateri();
    
    // AI confirms material addition
    setTimeout(() => {
      this.messages.push({
        text: `Materi "${materi.title}" telah berhasil ditambahkan! Sekarang Anda bisa bertanya tentang materi ini. 🎉📚`,
        sender: 'ai',
        time: this.getCurrentTime(),
        type: 'text'
      });
    }, 500);
  }

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}