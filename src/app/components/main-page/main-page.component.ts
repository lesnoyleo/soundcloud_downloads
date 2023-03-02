import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { LoadDataService } from '../../services/load-data.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  someString!: string;
  srcStringArray!: string[] | null | undefined;
  srcItemsToShow!: string[] | null | undefined;
  regex = /(?<=href=")(.*)(?=\?in=lesnoy_leo\/sets)/g;
  pastedHref = 'https://soundcloud.com';
  isFinished = false;
  dataPatchs: string[] = ['summerOfHaze', 'suicideboys', 'soul mate'];
  frames!: HTMLCollection;
  pageSizeOptions = [20, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private loadDataService: LoadDataService) {}

  downloadDataFromTxtInAssets(path: string): void {
    this.loadDataService.getTextFromTxt(path).subscribe((res) => {
      this.someString = res;
      this.convertedToArray();
      this.addPrevHref();
      this.combineServiceHref();
      this.framesBindEventer();
    });
  }

  convertedToArray(): void {
    this.srcStringArray = this.someString.match(this.regex);
  }

  addPrevHref(): void {
    this.srcStringArray = this.srcStringArray?.map(
      (value) => this.pastedHref + value
    );
  }

  combineServiceHref(): void {
    this.srcStringArray = this.srcStringArray?.map(
      (value) => 'https://loader.to/api/button/?url=' + value + '&f=mp3'
    );
    this.srcItemsToShow = this.srcStringArray?.slice(
      0,
      this.paginator.pageSize || this.pageSizeOptions[0]
    );
    console.log(this.srcStringArray);
    this.isFinished = true;
  }

  framesBindEventer(): void {
    this.frames = document.getElementsByTagName('iframe');
    for (let index = 0; index < this.frames.length; index++) {
      this.frames[index].addEventListener('mouseenter', () => {
        this.frames[index].parentElement?.click();
      });
    }
  }

  onPageChange($event: any) {
    this.srcItemsToShow = this.srcStringArray?.slice(
      $event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize + $event.pageSize
    );
  }
}
