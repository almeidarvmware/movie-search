import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIUrls } from '../constants';
import { MovieQueryResult } from '../models/movie/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Retrieve movies with the given query
   *
   * @param {string} query
   * @returns {Observable<MovieQueryResult>}
   * @memberof MovieService
   */
   public getMoviesWithQuery(query: string, page: number = 1): Observable<any> {
    return this.http.get(APIUrls.MOVIES.GET_WITH_QUERY(query, page));
  }
}
