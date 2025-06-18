import { Component, inject, input, viewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  modal = inject(ModalService); //will create an instance of the service

  id = input.required<string>()
  dialog = viewChild.required<ElementRef<HTMLDialogElement>>('baseDialog'); //returns a Signal

  ngAfterViewInit(): void {
    this.modal.register(this.id(), this.dialog().nativeElement);
  }

  ngOnDestroy(): void {
    this.modal.unregister(this.id());
  }
}
