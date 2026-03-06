import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptimalStrategyResultComponent } from './optimal-strategy-result.component';
import type { StrategyResult } from '../../data/models';

describe('OptimalStrategyResultComponent', () => {
  let component: OptimalStrategyResultComponent;
  let fixture: ComponentFixture<OptimalStrategyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimalStrategyResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptimalStrategyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show nothing when strategy is null', () => {
    fixture.componentRef.setInput('strategy', null);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).not.toContain('Total score');
  });

  it('should show totalScore, bulletsUsed, secondsUsed when strategy is set', () => {
    const strategy: StrategyResult = {
      totalScore: 100,
      bulletsUsed: 10,
      secondsUsed: 30,
      eliminatedZombies: [],
    };
    fixture.componentRef.setInput('strategy', strategy);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('100');
    expect(el.textContent).toContain('10');
    expect(el.textContent).toContain('30');
  });
});
