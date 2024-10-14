import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryComponent } from './order-summary.component';
import { CommonModule } from '@angular/common';
import { Order } from '../order/order.component';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSummaryComponent, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;

    const mockOrder = {
      orderId: 999,
      tacos: [
        { id: 3, name: 'Al Pastor', price: 2.5, quantity: 2 },
        { id: 1, name: 'Carnitas', price: 3, quantity: 1, noOnions: true }
      ]
    };

    component.order = mockOrder;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Unit test that defines a mock order object literal to represent placing
   * a new order. Next, the getTotal() method is called to validate the
   * calculated total.
   */
  it('should calculate total price correctly', () => {
    const mockOrder: Order = {
      orderId: 1000,
      tacos: [
        { id: 1, name: 'Carnitas', price: 3, quantity: 2 },
        { id: 3, name: 'Al Pastor', price: 2.5, quantity: 1 }
      ]
    };

    component.order = mockOrder;
    expect(component.getTotal()).toEqual(8.5);
  });

  /**
   * Unit test that checks if the a message is displayed in the HTML for
   * empty orders.
   */
  it('should display message for empty order', () => {
    component.order = { orderId: 1001, tacos: [] };
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('p').textContent).toContain('No tacos added to the order yet.');
  });

  /**
   * Unit test that defines a mock order object literal and checks if the
   * HTML displays the correct order.
   */
  it('should display details for each taco in the order', () => {
    const mockOrder: Order = {
      orderId: 1002,
      tacos: [
        { id: 1, name: 'Carnitas', price: 3, quantity: 2 },
        { id: 3, name: 'Al Pastor', price: 2.5, quantity: 1 }
      ]
    };

    component.order = mockOrder;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('li').textContent).toContain('2x Carnitas');
    expect(compiled.querySelector('li').textContent).toContain('Price per taco: $3.00');
  });
});
