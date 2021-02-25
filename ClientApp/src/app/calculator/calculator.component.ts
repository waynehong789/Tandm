import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { selectUserToken } from '../store/selector';
import { take } from 'rxjs/operators';
import { AppService } from '../services/app.service';
import { OPERATIONS } from '../constants/enums';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  userToken = '';
  subText = '';
  mainText = '';
  operand1: number;
  operand2: number;
  operator = '';
  calculationString = '';
  answered = false;
  operatorSet = false;

  constructor(private store: Store<any>, private appService: AppService) {
    /*
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error)); */
  }

  ngOnInit() {
    this.store
      .pipe(select(selectUserToken), take(1))
      .subscribe((token) => (this.userToken = token));
    console.log('User Token:', this.userToken);
  }

  pressKey(key: string) {
    if (key === '/' || key === 'x' || key === '-' || key === '+') {
      const lastKey = this.mainText[this.mainText.length - 1];
      if (
        lastKey === '/' ||
        lastKey === 'x' ||
        lastKey === '-' ||
        lastKey === '+'
      ) {
        this.operatorSet = true;
      }
      if (this.operatorSet || this.mainText === '') {
        return;
      }
      this.operand1 = parseFloat(this.mainText);
      this.operator = key;
      this.operatorSet = true;
    }
    if (this.mainText.length === 10) {
      return;
    }
    this.mainText += key;
  }

  allClear() {
    this.mainText = '';
    this.subText = '';
    this.operatorSet = false;
  }

  getAnswer() {
    this.calculationString = this.mainText;
    this.operand2 = parseFloat(this.mainText.split(this.operator)[1]);
    if (this.operator === '/') {
      this.subText = this.mainText;
      this.appService
        .calculate(this.operand1, this.operand2, OPERATIONS.Division, this.userToken)
        .subscribe((result) => {
          this.mainText = result.toString();
          this.subText = this.calculationString;
          if (this.mainText.length > 9) {
            this.mainText = this.mainText.substr(0, 9);
          }
        });
    } else if (this.operator === 'x') {
      this.subText = this.mainText;
      this.appService
      .calculate(this.operand1, this.operand2, OPERATIONS.Multiplication, this.userToken)
      .subscribe((result) => {
        this.mainText = result.toString();
        this.subText = this.calculationString;
        if (this.mainText.length > 9) {
          this.mainText = 'ERROR';
          this.subText = 'Range Exceeded';
        }
      });
    } else if (this.operator === '-') {
      this.subText = this.mainText;
      this.appService
      .calculate(this.operand1, this.operand2, OPERATIONS.Subtraction, this.userToken)
      .subscribe((result) => {
        this.mainText = result.toString();
        this.subText = this.calculationString;
      });
    } else if (this.operator === '+') {
      this.subText = this.mainText;
      this.appService
      .calculate(this.operand1, this.operand2, OPERATIONS.Addition, this.userToken)
      .subscribe((result) => {
        this.mainText = result.toString();
        this.subText = this.calculationString;
        if (this.mainText.length > 9) {
          this.mainText = 'ERROR';
          this.subText = 'Range Exceeded';
        }
      });
    } else {
      this.subText = 'ERROR: Invalid Operation';
    }
    this.answered = true;
  }
}
