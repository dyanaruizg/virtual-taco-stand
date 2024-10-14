import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-daily-specials',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (dailySpecial) {
      <div class="dspecial-container">
        <h1>{{ dailySpecial.day }}'s Daily Special</h1>
        <div class="dspecial-card">
          <h3>{{ dailySpecial.name }}</h3>
          <p>{{ dailySpecial.description }}</p>
          <p>Price: {{ dailySpecial.price | currency }}</p>
        </div>
      </div>
    } @else {
      <div class="dspecial-container">
        <h1>{{ noSpecialMessage }}</h1>
      </div>
    }
  `,
  styles: `
    .dspecial-container {
      display: flex;
      flex-direction: column;
      padding: 0;
    }

    .dspecial-card {
      margin: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      width: 80%;
    }
  `
})
export class DailySpecialsComponent {
  dayOfTheWeek: string;
  dailySpecial: any = null;
  noSpecialMessage: string = '';

  constructor(private http: HttpClient) {
    this.dayOfTheWeek = this.getDayOfTheWeek();

    this.http.get(`http://localhost:3000/api/daily-specials?day=${this.dayOfTheWeek}`).subscribe({
      next: (res) => {
        console.log(res);
        this.dailySpecial = res;
      },
      error: (err) => {
        console.error('Error fetching daily special', err);
        if(err.error === 'Special not found') {
          this.noSpecialMessage = 'No special today. Check back tomorrow!';
        } else {
          this.noSpecialMessage = 'Error fetching daily special. Please try again later.';
        }
      }
    });
  }

  getDayOfTheWeek(): string {
    return new Date().toLocaleDateString('en-US', { weekday: 'long' });
  }
}
