import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyItemListComponent } from './my-item-list.component';

describe('MyItemListComponent', () => {
  let component: MyItemListComponent;
  let fixture: ComponentFixture<MyItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
