import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'fbTimestamp'
})
export class FbTimestampPipe implements PipeTransform {

  transform(value: Timestamp | undefined) {
    if (!value) return '';

    return value.toDate().toLocaleDateString();
  }
}
