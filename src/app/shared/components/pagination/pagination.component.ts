import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import paginate from 'src/app/shared/pagination.util';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() items = [];
  @Input() label: string = '';
  
  @Input() pageSize = 20;
  @Input() maxPages = 100;

  @Output() onItemClick: EventEmitter<any> = new EventEmitter();

  public currentPage = 1;
  public pages: Array<number> = [];
  public startIndex!: number;
  public endIndex!: number;

  public ngOnInit() {
    this.calculateIndexes();
  }

  public setCurrent(e: Event, page: number): void {
    e.preventDefault();
    this.currentPage = page;
    this.calculateIndexes();
  }

  public getLabel(i: number): never {
    return this.items[i][this.label];
  }

  public onClick(item: any): void {
    this.onItemClick.emit(item);
  }

  private calculateIndexes() {
    const pagination = paginate(
      this.items.length,
      this.currentPage,
      this.pageSize,
      this.maxPages
    );
    this.currentPage = pagination.currentPage;
    this.pages = pagination.pages;
    this.startIndex = pagination.startIndex;
    this.endIndex = pagination.endIndex;
  }

}
