import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  EventEmitter,
  AfterViewInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-mine-grid',
  templateUrl: './mine-grid.component.html',
  styleUrls: ['./mine-grid.component.css'],
})
export class MineGridComponent implements OnInit, AfterViewInit {
  public value?: string = '0';
  public getValue() {
    return this.value;
  }
  public setValue(num: string) {
    this.value = num;
  }
  show = {
    visibility: 'hidden',
  };
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {}
  onClick(evt: any) {
    this.show.visibility = ' visible';
  }
}
