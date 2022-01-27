import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Movie, MovieQueryResult } from 'src/app/shared/models/movie/movie.model';
import { MovieService } from 'src/app/shared/services/movie.service';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  public moviesList!: Movie[];
  public searchQuery: string = '';
  public showLoading: boolean = false;
  public displayedColumns: string[] = ['title', 'release', 'overview'];


  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private _snackBar: MatSnackBar
  ) {
    this.checkIfRouterHasData();
  }

  /**
  * Check if needs to get movies from api when component initialize
  *
  * @memberof ResultsComponent
  */
  public ngOnInit(): void {
    this.verifyQueryAndGetMovies();
  }

  /**
  * Unsubscribe from all Obaervers on component destroy
  *
  * @memberof ResultsComponent
  */
  public ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  /**
  * Navigate to home page
  *
  * @memberof ResultsComponent
  */
  public goBackToHome(): void {
    this.router.navigate(['']);
  }


  /**
  * Check if router has data and init moviesList
  *
  * @private
  * @memberof ResultsComponent
  */
  private checkIfRouterHasData(): void {
    const state: any = this.router.getCurrentNavigation()?.extras?.state;
    if (state?.data) {
      this.moviesList = state?.data?.results;
    }
  }

  /**
  * Verify if url has search query and moviesList not initialized
  *
  * @private
  * @memberof ResultsComponent
  */
  private verifyQueryAndGetMovies(): void {
    this.searchQuery = this.activatedRoute.snapshot.params['query'];
    if (this.searchQuery && !this.moviesList) {
      this.search();
    }
  }

  /**
  * Get movies with the given query
  *
  * @memberof ResultsComponent
  */
  private search(): void {
    this.showLoading = true;
    this.movieService.getMoviesWithQuery(this.searchQuery)
        .pipe(takeUntil(this.subscriptionDestroyer))
        .subscribe({
          next: (data: MovieQueryResult) => {
            this.showLoading = false;
            this.moviesList = data.results;
          },
          error: (e) => {
            this.displayRequestError(e.error);
            this.showLoading = false;
          }
        })
  }

  /**
  * Show snackbar with the given error
  *
  * @private
  * @param {*} err
  * @memberof ResultsComponent
  */
  private displayRequestError(err: any): void {
    this._snackBar.open(`Error: ${err.errors[0]}`, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
