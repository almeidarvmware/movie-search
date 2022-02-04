import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie/movie.model';

@Component({
  selector: 'app-generic-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {

  @Input() tableTitle: string = '';
  @Input() moviesList: Movie[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
