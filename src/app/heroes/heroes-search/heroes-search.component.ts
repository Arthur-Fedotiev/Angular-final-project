import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-heroes-search',
  templateUrl: './heroes-search.component.html',
  styleUrls: ['./heroes-search.component.css'],
})
export class HeroesSearchComponent implements OnInit {
  @Output() searchHero = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      heroName: this.formBuilder.control('', Validators.required),
    });
  }

  onSubmit(heroSearch: HeroSearch) {
    this.searchHero.emit(heroSearch.heroName);
  }
}

export interface HeroSearch {
  heroName: string;
}
