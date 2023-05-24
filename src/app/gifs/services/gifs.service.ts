import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchResponse} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _tagsHistory: string[] = [];

  public gifsList: Gif[] = [];
  private GIPHY_API_KEY: string = "FgjqGzeZmcTbhy4lrSi2fA94wRzJ1Gq8";
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';
  private limit: string = '10';

  constructor(private http: HttpClient) {
    this.loadLocalStore();
  }

  addSearchTag(tag: string): void {
    if (!tag) return;

    const params = new HttpParams()
      .set('api_key', this.GIPHY_API_KEY)
      .set('limit', this.limit)
      .set('q', tag)


    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(resp => {
        this.gifsList = resp.data;
        console.log(this.gifsList);
      })

    this.organizeHistory(tag);

  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      console.log("!???")
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);

    this.saveLocalStorage();

  }

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStore(): void {
    if (!localStorage.getItem('history')) {
      return;
    }

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) {return;}
    this.addSearchTag(this._tagsHistory[0])
  }

}
