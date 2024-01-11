import { Location } from '../../location';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LocationAPIService } from '../location-api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  displayClass = "search-bar light"
  resultsClass = "results light"
  searchCity : String = '';
  locationList : Location[] = [];

  constructor(private eRef: ElementRef, private sanitizer: DomSanitizer, private locationApiService : LocationAPIService) { }

  @HostListener('document:click', ['$event'])

  clickout(event : Event){
    const listElement = this.eRef.nativeElement.querySelector('.list');
    if(!this.eRef.nativeElement.contains(event.target) || (listElement && listElement.contains(event.target))){
      this.locationList = []
    }
  }

  search(){
    if(this.searchCity.length > 0){
      this.locationApiService.getLocation(this.searchCity).subscribe(locations => this.locationList = locations);
    }
  }

  ngAfterContentChecked(){
    if(document.body.classList.contains('dark-theme')){
      this.displayClass = "search-bar dark";
    } else{
      this.displayClass = "search-bar light"
    }

  }

}
