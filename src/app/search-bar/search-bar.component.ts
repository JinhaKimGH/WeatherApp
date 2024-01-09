import { Location } from '../../location';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  displayClass = "search-bar light"
  searchCity : String = '';
  locationList : Location[] = [
    {
      "name": "Toronto",
      "lat": 75,
      "lon": 77,
      "country": "CA",
      "state": "Ontario"
    }
  ];

  constructor(private sanitizer: DomSanitizer) { }

  search(){
    console.log(this.searchCity);
  }

  ngOnChange(){

  }

  ngAfterContentChecked(){
    if(document.body.classList.contains('dark-theme')){
      this.displayClass = "search-bar dark";
    } else{
      this.displayClass = "search-bar light"
    }

  }

  getSafeUrl(location: Location): SafeUrl {
    const url = `lat=${location.lat}&lon=${location.lon}`;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
