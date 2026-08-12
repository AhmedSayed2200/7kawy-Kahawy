import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {

   private readonly httpClient=inject(HttpClient);
  private readonly apiKey = 'a9cf64fa1e26181b8257e2a9f2986d3f';
  private readonly baseUrl = 'https://gnews.io/api/v4/';
getTopHeadlines(
    category: string = 'general',
    country: string = 'eg',
    lang: string = 'en'
  ): string {
    return `top-headlines?category=${category}&lang=${lang}&max=10&apikey=${this.apiKey}`;
  }
getNews(detailsData: string): Observable<any> {
  const fullUrl = this.baseUrl + detailsData;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(fullUrl)}`;
  return this.httpClient.get(proxyUrl);
}

  
   

}
