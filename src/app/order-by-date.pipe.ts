import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
     let newVal = value.sort((a: any, b: any) => {
            let date1 = (new Date(a.timeStamp)).getTime();
            let date2 = (new Date(b.timeStamp)).getTime();
            if (date1 < date2) {
                return 1;
            } else if (date1 > date2) {
                return -1;
            } else {
                return 0;
            }
        });

        console.log(newVal);
        return newVal;
  }

}
