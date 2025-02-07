import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormCompenentComponent } from './login-form-compenent.component';

describe('LoginFormCompenentComponent', () => {
  let component: LoginFormCompenentComponent;
  let fixture: ComponentFixture<LoginFormCompenentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormCompenentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormCompenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
