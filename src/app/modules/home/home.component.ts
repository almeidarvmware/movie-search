import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieQueryResult } from 'src/app/shared/models/movie/movie.model';
import { MovieService } from 'src/app/shared/services/movie.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  public searchQuery = new FormControl('');
  public showLoading: boolean = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private movieService: MovieService,
    private _snackBar: MatSnackBar
  ) { 
    this.searchQuery.addValidators([Validators.required]);
  }

  /**
   * Unsubscribe from all Subjects on component destroy
   *
   * @memberof HomeComponent
   */
  public ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  /**
   * Get movies with the given query
   *
   * @memberof HomeComponent
   */
  public search(): void {
    this.showLoading = true;
    this.movieService.getMoviesWithQuery(this.searchQuery.value)
        .pipe(takeUntil(this.subscriptionDestroyer))
        .subscribe({
          next: (data: MovieQueryResult) => {
            this.showLoading = false;
            this.navigateToResults(data);
          },
          error: (e) => {
            this.displayRequestError(e.error);
            this.showLoading = false;
          }
        })
  }


  /**
   * Change to results page and send data to ResultsComponent
   *
   * @private
   * @param {MovieQueryResult} result
   * @memberof HomeComponent
   */
  private navigateToResults(result: MovieQueryResult): void {
    this.router.navigate(
          [`/results`, { query: this.searchQuery.value}], 
          { state: {data: result}}
        );
  }

  /**
   * Show snackbar with the given error
   *
   * @private
   * @param {*} err
   * @memberof HomeComponent
   */
  private displayRequestError(err: any): void {
    this._snackBar.open(`Error: ${err.errors[0]}`, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
