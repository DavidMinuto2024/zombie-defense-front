import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-optimal-strategy-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './optimal-strategy-form.component.html',
  styleUrl: './optimal-strategy-form.component.css',
})
export class OptimalStrategyFormComponent {
  /** Emits when user submits with bullets and seconds available. */
  readonly strategyRequest = output<{ bullets: number; secondsAvailable: number }>();

  protected bullets = 20;
  protected secondsAvailable = 60;

  private static clampPositiveInt(value: number | string): number {
    const n = typeof value === 'string' ? parseInt(value, 10) : Math.floor(Number(value));
    if (Number.isNaN(n) || n < 1) return 1;
    return n;
  }

  /** Prevents minus, 'e', 'E', '+' and non-digit keys in number inputs. */
  protected blockInvalidNumberKey(event: KeyboardEvent): void {
    const key = event.key;
    if (key === '-' || key === 'e' || key === 'E' || key === '+' || key === '.') {
      event.preventDefault();
      return;
    }
    if (key.length === 1 && !/[0-9]/.test(key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(key)) {
      event.preventDefault();
    }
  }

  protected onBulletsChange(value: number | string): void {
    this.bullets = OptimalStrategyFormComponent.clampPositiveInt(value);
  }

  protected onSecondsChange(value: number | string): void {
    this.secondsAvailable = OptimalStrategyFormComponent.clampPositiveInt(value);
  }

  protected onSubmit(): void {
    this.strategyRequest.emit({
      bullets: this.bullets,
      secondsAvailable: this.secondsAvailable,
    });
  }
}
