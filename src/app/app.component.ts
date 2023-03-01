import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'SoundcloundAPI';

  someString!: string;
  someStringArray!: string[] | null | undefined;
  regex = /(?<=href=")(.*)(?=\?in=lesnoy_leo\/sets)/g;
  pastedHref = 'https://soundcloud.com';

  isFinished = false;

  dataPatchs: string[] = ['summerOfHaze', 'suicideboys'];

  frames!: HTMLCollection;

  constructor(
    private httpClient: HttpClient,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  downloadDataFromTxtInAssets(path: string): void {
    this.httpClient
      .get(`assets/${path}.txt`, { responseType: 'text' as 'json' })
      .subscribe((res) => {
        this.someString = res as string;
        this.convertedToArray();
        this.addPrevHref();
        this.combineServiceHref();
        this.framesBindEventer();
      });
  }

  convertedToArray(): void {
    this.someStringArray = this.someString.match(this.regex);
  }

  addPrevHref(): void {
    this.someStringArray = this.someStringArray?.map(
      (value) => this.pastedHref + value
    );
  }

  combineServiceHref(): void {
    this.someStringArray = this.someStringArray?.map(
      (value) => 'https://loader.to/api/button/?url=' + value + '&f=mp3'
    );
    console.log(this.someStringArray);

    this.isFinished = true;
    this.cdr.detectChanges();
    this.cdr.detach();
  }

  framesBindEventer(): void {
    this.frames = document.getElementsByTagName('iframe');
    for (let index = 0; index < this.frames.length; index++) {
      this.frames[index].addEventListener('mouseenter', () => {
        this.frames[index].parentElement?.click();
      });
    }
  }
}
