import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NewsService } from '../../../../core/services/news.service';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-rigth-side-bar',
  imports: [DatePipe,UpperCasePipe],
  templateUrl: './rigth-side-bar.component.html',
  styleUrl: './rigth-side-bar.component.css',
})
export class RigthSideBarComponent  {
@ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLDivElement>;
  private readonly newsService=inject(NewsService);
articles: any[] = [];
// ngOnInit(): void {
//     this.newsService.getNews(this.newsService.getTopHeadlines()).subscribe({
//       next: (res) => {
//         console.log("Data received successfully:", res);
//         this.articles = res.articles || [];
//       },
//       error: (err) => {
//         console.error("API Error:", err);
//       }
//     });
//   }
  scrollSlider(offset: number): void {
    if (this.sliderContainer) {
      this.sliderContainer.nativeElement.scrollLeft += offset;
    }
  }
}
