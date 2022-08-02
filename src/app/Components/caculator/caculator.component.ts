import { CaculatorService } from './../../services/caculator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caculator',
  templateUrl: './caculator.component.html',
  styleUrls: ['./caculator.component.scss'],
})
export class CaculatorComponent implements OnInit {
  constructor(public CaculatorService: CaculatorService) {}
  result = 0;
  arr: any = [];
  ngOnInit(): void {
    this.CaculatorService.setOnChangeResult((value) => {
      this.result = value;
    });
  }
  Delete(){
    // this.CaculatorService.currentInput = 0;
    // this.CaculatorService.currentOperator = "";
    this.result = 0;
    this.CaculatorService.currentResult = this.result;
  }
  pressNum(input: any) {
    let data = parseFloat(input);
    if (isNaN(data)) {
      if (input == '=') {
        let result = this.CaculatorService.calculate(
          this.CaculatorService.currentResult,
          this.CaculatorService.currentInput,
          this.CaculatorService.currentOperator
        );
        this.CaculatorService.currentInput = 0;
        this.CaculatorService.currentOperator = '';

        this.CaculatorService.setResult(result);
      } else {
        this.CaculatorService.currentOperator = input;
      }
    } else {
      if (this.CaculatorService.currentOperator != '') {
        this.CaculatorService.currentInput = parseFloat(
          this.CaculatorService.currentInput.toString() + data.toString()
        );
      } else {
        // this.CaculatorService.currentInput = data;
        this.CaculatorService.setResult(
          parseFloat(`${this.CaculatorService.currentResult}${data}`)
        );
      }
    }
  }
}
