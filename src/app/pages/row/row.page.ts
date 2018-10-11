import { Component, OnInit } from '@angular/core';
import { RowQuery } from '../../store/row';

@Component({
  selector: 'app-row',
  templateUrl: './row.page.html',
  styleUrls: ['./row.page.scss'],
})
export class RowPage implements OnInit {

  constructor(
    private rowQ: RowQuery
  ) { }

  public isLoggin$ = this.rowQ.selectLoading();

  ngOnInit() {
  }

}
