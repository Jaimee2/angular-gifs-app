import {Component, ElementRef, ViewChild} from '@angular/core';
import {GifsService} from "../../services/gifs.service";

@Component({
  selector: 'search-box',
  template: `<H5>Search: </H5>
  <input type="text"
         class="form-control"
         placeholder="Seach gifs..."
         (keyup.enter)="searchTag()"
         #txtTagInput
  >
  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public txtTagInput!: ElementRef<HTMLInputElement>;


  constructor(private gifsService: GifsService) {
  }

  public searchTag (): void{
    const newTag:string = this.txtTagInput.nativeElement.value;
    this.gifsService.addSearchTag(newTag);
    this.txtTagInput.nativeElement.value = '';

  }

}
