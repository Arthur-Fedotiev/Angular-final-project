import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { IAlphabet } from '../../interfaces/sharedInterfaces';
import { alphabetToken } from '../../providers';

@Component({
  selector: 'app-alphabetical-search',
  templateUrl: './alphabetical-search.component.html',
  styleUrls: ['./alphabetical-search.component.css'],
})
export class AlphabeticalSearchComponent {
  @Output()
  alphabeticalSearch: EventEmitter<string> = new EventEmitter<string>();

  showSortPanel: boolean = false;
  searchLetter: string = 'A';

  constructor(@Inject(alphabetToken) public alphabet: IAlphabet) {}

  toggleSortPanel(): void {
    this.showSortPanel = !this.showSortPanel;
  }

  handleLetterClick(searchLetter: string): void {
    this.searchLetter = searchLetter;
    this.alphabeticalSearch.emit(searchLetter);
  }
}
