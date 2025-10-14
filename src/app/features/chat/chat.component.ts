import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AiService } from 'src/app/core/services/ai.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('chatWindow') private chatWindow!: ElementRef;
  input = new FormControl('');
  history: { question: string; answer?: string; displayed?: string }[] = [];
  loading = false;
  typing = false;
  typingInterval: any;

  constructor(private ai: AiService, private storage: StorageService) {
    this.history = this.storage.getHistory() || [];
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.chatWindow) {
      this.chatWindow.nativeElement.scrollTop =
        this.chatWindow.nativeElement.scrollHeight;
    }
  }

  submit() {
    const question = this.input.value?.trim();
    if (!question) return;

    this.history.push({ question, displayed: '' });
    this.loading = true;
    this.typing = true;
    this.input.reset();

    this.ai.ask(question).subscribe({
      next: (res) => {
        const answer = res.answer;
        this.history[this.history.length - 1].answer = answer;
        this.animateTyping(this.history.length - 1, answer);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.typing = false;
      },
    });
  }

  private animateTyping(index: number, fullText: string) {
    const speed = 25;
    let i = 0;
    clearInterval(this.typingInterval);

    this.typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        this.history[index].displayed = fullText.slice(0, i);
        i++;
      } else {
        clearInterval(this.typingInterval);
        this.loading = false;
        this.typing = false;
        this.storage.setHistory(this.history.slice(-5));
      }
    }, speed);
  }

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }
}
