import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieverAddressComponent } from './reciever-address.component';

describe('RecieverAddressComponent', () => {
  let component: RecieverAddressComponent;
  let fixture: ComponentFixture<RecieverAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecieverAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecieverAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
