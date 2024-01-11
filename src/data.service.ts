import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  submittedData: any[] = [];

  addSubmittedData(data: any) {
    this.submittedData.push(data);
  }

  getSubmittedData(): any[] {
    console.log(this.submittedData);
    return this.submittedData;
  }
}
