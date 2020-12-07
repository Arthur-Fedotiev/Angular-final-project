import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroSearch } from 'src/app/shared/interfaces/heroInterface';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-heroes-search',
  templateUrl: './heroes-search.component.html',
  styleUrls: ['./heroes-search.component.css'],
})
export class HeroesSearchComponent implements OnInit {
  @Input() set searchLetter(val) {
    this.letter = val;
  }
  @Output() searchHero = new EventEmitter<string>();

  letter: string = '';
  searchForm: FormGroup;
  recentSearches: string[];

  constructor(
    private formBuilder: FormBuilder,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.getSearchForm();
    this.recentSearches = this.heroesService.getSuccessfullQueries();
  }

  getSearchForm(): FormGroup {
    return this.formBuilder.group({
      heroName: this.formBuilder.control('', Validators.pattern('[\\w]+')),
    });
  }

  onSubmit(heroSearch: HeroSearch): void {
    this.searchHero.emit(heroSearch.heroName);
  }
}
