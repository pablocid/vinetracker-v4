import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, EventEmitter } from '@angular/core';
import { Attribute } from '../../../store/attribute';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  public attribute$: Observable<Attribute>;
  // public attr: Attribute;
  public edit: boolean;
  public canEdit: boolean;
  // public subject: BehaviorSubject<any>;
  // public value: Observable<any>;
  public label: Observable<any>;
  public attrValue: Observable<any>;
  public description: Observable<string>;
  // public listViewLabel: Observable<any>;
  public listViewValue: Observable<any>;
  public editViewValue: Observable<any>;
  // public updateOptios: BehaviorSubject<{ push?: boolean, delete?: boolean, pop?: boolean, partial?: any }>;
  public update;
  public valueIsSet$: Observable<boolean>;

  constructor() {
    // this.subject = new BehaviorSubject(undefined);
    // this.updateOptios = new BehaviorSubject({});
    // this.value = this.subject.asObservable();
  }


  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('listViewTmpl') listViewTmpl: TemplateRef<any>;
  @ViewChild('editViewTmpl') editViewTmpl: TemplateRef<any>;

  ngOnInit() {
    this.setTemplate();
    // this.subject.next(this.attr.value);
    // this.subject = new BehaviorSubject(this.attr.value);
    this.description = this.attribute$.pipe(map(x => x.config)).pipe(map(config => {
      return this.getAttr(config, 'label', 'string');
    }));
    this.valueIsSet$ = this.attribute$.pipe(map(x => x.value)).pipe(map(value => {
      if (value === undefined || value === null) {
        return false;
      } else {
        return true;
      }
    }));

    this._setupOnInit();
    this.setupOnInit();
  }

  protected setupOnInit() { }
  protected _setupOnInit() { }


  protected setTemplate() {
    if (this.edit === true) {
      try { this.entry.createEmbeddedView(this.editViewTmpl); } catch (e) { console.log('Error: No existe template cardView'); }
    } else {
      try { this.entry.createEmbeddedView(this.listViewTmpl); } catch (e) { console.log('Error: No existe el template listView'); }
    }
  }

  updateNewValue(newValue, options) {
    this.update({ value: newValue, editValue: undefined });
  }

  assessAttr() { }
  save($event) { }

  public getAttr(attrs, id, dd) {
    const index = attrs.map(x => x.id).indexOf(id);
    if (index === -1) { return undefined; }
    return attrs[index][dd];
  }

}
