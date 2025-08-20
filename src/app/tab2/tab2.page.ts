import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',y
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  materiLink: string = '';
  materiList: any[] = [];

  constructor(private supabase: SupabaseService) {
    this.loadMateri();
  }

  async saveMateri() {
    const { data, error } = await this.supabase.client
      .from('materi')
      .insert([{ title: this.materiLink, type: 'link' }]);

    if (!error) {
      this.materiLink = '';
      this.loadMateri();
    }
  }

  async uploadFile(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const { data, error } = await this.supabase.client.storage
      .from('materi-files')
      .upload(`pdfs/${Date.now()}-${file.name}`, file);

    if (!error) {
      await this.supabase.client.from('materi').insert([
        { title: file.name, type: 'pdf', url: data.path }
      ]);
      this.loadMateri();
    }
  }

  async loadMateri() {
    const { data, error } = await this.supabase.client
      .from('materi')
      .select('*');

    if (!error) this.materiList = data || [];
  }
}
