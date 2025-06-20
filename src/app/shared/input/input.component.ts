import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [provideNgxMask()] //add a providers array to add services
})
export class InputComponent {
  control = input.required<FormControl>();
  type = input('text');
  placeholder = input('');
  format = input(''); //empty string effectively turned off input masking
}
