import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Input,
} from '@angular/core';
import { MineGridComponent } from '../mine-grid/mine-grid.component';

@Component({
  selector: 'app-mine-meister',
  templateUrl: './mine-meister.component.html',
  styleUrls: ['./mine-meister.component.css'],
})
export class MineMeisterComponent implements OnInit, AfterViewInit {
  Arr = Array;
  rows: number = 0;
  cols: number = 0;
  mines: number = 0;
  mineGridArr: ComponentRef<MineGridComponent>[][] = [];
  gridStyles = {};

  @ViewChild('componentHolder', { read: ViewContainerRef })
  componentHolder!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  drawGrid(rows: any, cols: any, mines: any): void {
    this.mineGridArr.forEach((element) => {
      element.forEach((_element) => {
        _element.destroy();
      });
    });
    this.mineGridArr.splice(0, this.mineGridArr.length);
    this.rows = Number(rows);
    this.cols = Number(cols);
    this.mines = Number(mines);
    this.gridStyles = {
      gridTemplateColumns: 'repeat(' + this.cols + ',1fr)',
      width: this.cols * 50 + 'px',
    };

    for (let i = 0; i < this.rows; i++) {
      this.mineGridArr[i] = [];
      for (let j = 0; j < this.cols; j++) {
        const componentFactory =
          this.componentFactoryResolver.resolveComponentFactory(
            MineGridComponent
          );
        const componentRef =
          this.componentHolder.createComponent(componentFactory);
        this.mineGridArr[i][j] = componentRef;
      }
    }
    this.setGrids();
  }
  setGrids(): void {
    let totalMines = 0;
    let values: string[][] = [];

    while (totalMines < this.mines) {
      let r = Math.floor(Math.random() * this.rows);
      let c = Math.floor(Math.random() * this.cols);

      if (this.mineGridArr[r][c].instance.getValue() != '*') {
        this.mineGridArr[r][c].instance.setValue('*');
        totalMines += 1;
      }
    }

    let neighborGrids = [
      [1, -1],
      [1, 0],
      [1, 1],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.mineGridArr[i][j].instance.getValue() == '*') {
          neighborGrids.forEach((element) => {
            if (
              i + element[0] >= 0 &&
              i + element[0] < this.rows &&
              j + element[1] >= 0 &&
              j + element[1] < this.cols &&
              this.mineGridArr[i + element[0]][
                j + element[1]
              ].instance.getValue() != '*'
            ) {
              let val = Number(
                this.mineGridArr[i + element[0]][
                  j + element[1]
                ].instance.getValue()
              );
              val += 1;
              this.mineGridArr[i + element[0]][
                j + element[1]
              ].instance.setValue(String(val));
              console.log(val);
            }
          });
        }
      }
    }
  }

  log(evt: Event) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
