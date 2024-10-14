import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackComponent } from './feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackComponent, ReactiveFormsModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Unit test that calls the .valid() method to check if the form is valid
   * when empty, which is using reactive form validators to check the
   * validity of the feedbackForm.
   */
  it('form should be invalid when empty', () => {
    expect(component.feedbackForm.valid).toBeFalsy();
  });

  /**
   * Unit test that assigns values to the feedbackForm controls and calls
   * the .valid() method to check the validity of the feedbackForm.
   */
  it('form should be valid when filled correctly', () => {
    component.feedbackForm.controls['rating'].setValue('5');
    component.feedbackForm.controls['recommend'].setValue('Yes');
    component.feedbackForm.controls['comments'].setValue('Great service!');

    expect(component.feedbackForm.valid).toBeTruthy();
  });

  /**
   * Unit test that checks if the leaveFeedback() method is called when the
   * feedbackForm is submitted.
   */
  it('should call leaveFeedback on form submit with valid data', () => {
    spyOn(component, 'leaveFeedback');
    component.feedbackForm.controls['rating'].setValue('5');
    component.feedbackForm.controls['recommend'].setValue('Yes');
    component.feedbackForm.controls['comments'].setValue('Great service!');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.leaveFeedback).toHaveBeenCalled();
  });
});