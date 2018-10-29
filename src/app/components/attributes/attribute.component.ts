import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  ComponentRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { take, map } from 'rxjs/operators';
import { AttributeQuery, AttributeService, AttributeStore } from '../../store/attribute';
import { ObservationsComponent } from './observations/observations.component';
import { BaseComponent } from './base/base.component';
import { SelectionComponent } from './base/selection/selection.component';
import { SelectionImgComponent } from './base/selection-img/selection-img.component';
import { NotesComponent } from './base/notes/notes.component';
import { NumericListComponent } from './base/numeric-list/numeric-list.component';
import { ImageCaptureComponent } from './base/image-capture/image-capture.component';
import { MultipleSelectionComponent } from './base/multiple-selection/multiple-selection.component';

@Component({
  selector: 'app-attribute',
  template: '<span #entry></span>',
  changeDetection: ChangeDetectionStrategy.OnPush
  // encapsulation: ViewEncapsulation.None
})
export class AttributeComponent implements OnInit, AfterContentInit, OnDestroy {
  // tslint:disable-next-line:max-line-length
  // { schm: { "$oid": "5a0df6b63c8171072c880a0e"}, attributes: { $elemMatch: { id: "57c42f77c8307cd5b82f4486", reference: { "$oid": "57a8d8deef44961377521c2a" } } }  }
  public entity: boolean;
  constructor(
    private _resolver: ComponentFactoryResolver,
    private attrQ: AttributeQuery,
    private attrS: AttributeService,
    private attrStore: AttributeStore
  ) { }

  component: ComponentRef<BaseComponent>;

  @Input() attribute;
  @Input() edit: boolean;
  @Input() canEdit: boolean;
  @Output() goAssess = new EventEmitter<string>();
  @Output() save = new EventEmitter<{ value: string, options: { delete: boolean, push: boolean, pop: boolean } }>();
  @Output() goBack = new EventEmitter();
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  private checkForHexRegExp = /^[0-9a-fA-F]{24}$/;

  private attributesComponentList = [
    { name: 'vigor', id: '580c082b12e1240010cd9d64', component: SelectionComponent },
    { name: 'cluster size', id: '5851a7fc0cb9af001119793a', component: SelectionComponent },
    { name: 'cluster looseness', id: '5851a6970cb9af0011197939', component: SelectionComponent },
    { name: 'rachis thickness', id: '5851a9240cb9af001119793b', component: SelectionComponent },
    { name: 'grape flavor', id: '5851aa520cb9af001119793c', component: SelectionComponent },
    { name: 'grape texture', id: '5851ab960cb9af001119793d', component: SelectionComponent },
    { name: 'Apirenia', id: '5851984a0cb9af0011197937', component: SelectionImgComponent },
    { name: 'forma baya', id: '580c0caf90cc2700100db1d2', component: SelectionImgComponent },
    { name: 'cluster shape', id: '580c121390cc2700100db1d3', component: SelectionImgComponent },
    { name: 'cluster color', id: '585185360cb9af0011197935', component: SelectionImgComponent },
    { name: 'calibre', id: '5851a35c0cb9af0011197938', component: NumericListComponent },
    { name: 'observations', id: '5808de89832db50010d3192c', component: MultipleSelectionComponent },
    { name: 'images', id: '581a356c5c0eac001077ad6e', component: ImageCaptureComponent },
    { name: 'field notes', id: '57c8a0cca774d31000b71cd4', component: NotesComponent },
    { name: 'selection status', id: '5bd14b4bd71ef20014e4b327', component: SelectionComponent, entity: true },
    { name: 'fructification habit', id: '57feb94b179c960010e41f65', component: SelectionComponent },
    { name: 'cluster number', id: '5808d1e9d48d17001006e43c', component: NumericListComponent },
    { name: 'brix degree', id: '57c84628ab66902c2208a855', component: NumericListComponent }

  ];

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.component) { this.component.destroy(); }
  }

  ngAfterContentInit() {
    this.setComponentFactoryById(this.attribute);
  }

  private setComponentFactoryById(id: string) {
    if (!id || !this.checkForHexRegExp.test(id)) {
      throw new Error('id for attribute: ' + id);
    }
    const component = this.getAttr(this.attributesComponentList, id, 'component');
    if (!component) {
      // throw new Error('El id ' + id + ' no tiene componente');
      console.log('El id ' + id + ' no tiene componente');
      return;
    }
    this.entity = this.getAttr(this.attributesComponentList, id, 'entity');
    this.component = this.entry.createComponent(this._resolver.resolveComponentFactory(component));

    // setup component
    this.component.instance.attribute$ = this.attrQ.selectEntity(this.attribute);
    this.component.instance.update = (partial: any) => this.attrStore.update(id, () => partial);
    this.component.instance.attrValue = this.attrQ.selectEntity(this.attribute).pipe(map(a => a.value));
    this.component.instance.edit = this.edit;
    this.component.instance.canEdit = this.canEdit;
    this.component.instance.assessAttr = () => this.goAssess.emit(this.attribute);
    this.component.instance.save = async ($event) => {
      console.log('$event save', $event);
      await this.attrS.updateActiveAttr($event.value, $event.options, this.entity);
      this.component.instance.updateNewValue($event.value, $event.options);
    };
  }

  public async saveAndGoBack() {
    const attrActive = this.attrQ.getActive();
    await this.attrS.updateActiveAttr(attrActive.editValue, attrActive.updateOptions, this.entity);
    this.component.instance.updateNewValue(attrActive.editValue, attrActive.updateOptions);
    this.goBack.emit();
  }
  public async deleteAndGoBack() {
    const attrActive = this.attrQ.getActive();
    await this.attrS.updateActiveAttr(attrActive.value, { delete: true }, this.entity);
    this.component.instance.updateNewValue(undefined, { delete: true });
    this.goBack.emit();
  }

  public async saveFromComponent($event) {
    console.log('$event save', $event);
    await this.attrS.updateActiveAttr($event.value, $event.options, this.entity);
    this.component.instance.updateNewValue($event.value, $event.options);
  }

  public getAttr(attrs, id, dd) {
    const index = attrs.map(x => x.id).indexOf(id);
    if (index === -1) { return undefined; }
    return attrs[index][dd];
  }

}
