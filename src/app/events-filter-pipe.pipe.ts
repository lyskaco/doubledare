import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'onlyOpenPipe'
})
export class onlyOpenPipePipe implements PipeTransform {
  transform(value: any, arg: string) : any {
    
    if(arg === 'finished') {
        let newArr = value.filter((a : any) => {
            return a.status === 'finished' ;
        })

        return newArr;
    }
    if(arg === 'closed') {
        let newArr = value.filter((a : any) => {
            return a.status === 'closed' ;
        })

        return newArr;
    }
    if(arg === 'rejected') {
        let newArr = value.filter((a : any) => {
            return a.status === 'rejected' ;
        })

        return newArr;
    }
    if(arg === 'Waiting_For_Confirmation') {
        let newArr = value.filter((a : any) => {
            return a.status === 'Waiting_For_Confirmation' ;
        })

        return newArr;
    }
    if(arg === 'all') {
      let newArr = value.filter((a : any) => {
            return a.status !== 'rejected' ;
        })

        return newArr;
    }
    if(arg === 'open') {
        let newArr = value.filter((a : any) => {
            return a.status === 'pending';
        })

        return newArr;
      }
    }
}

@Pipe({
  name: 'eventsFilterPipe'
})

export class EventsFilterPipePipe implements PipeTransform {

  transform(value: any, arg: string): any {


        if(arg==='crewpick') {
            let newVal = value.filter((a : any) => {
                return a.VIP === "1";
            })
            return newVal;
        }
  		if(arg === 'highest') {
 		let newVal = value.sort((a: any, b: any) => {
            if (Number(a.roomPoint) < Number(b.roomPoint)) {
                return 1;
            } else if (Number(a.roomPoint) > Number(b.roomPoint)) {
                return -1;
            } else {
                return 0;
            }
        });

        return newVal;
  	} else if (arg === 'all') {
  		let newVal = value.sort((a: any, b : any) => {

              let date1 = new Date(a.timeStamp),
                  date2 = new Date(b.timeStamp);
                  
            if (date1 < date2) {

                return 1;

            } else if (date1 > date2) {

                return -1;
            } else {
                
                return 0;
            }
        //     let newVal = value.filter((a: any) => {
        //     return a.status === 'pending'        });

        // return newVal;
        });

        return newVal;
  }
  	 else if (arg === 'popular') {
  		let newVal = value.sort((a: any, b: any) => {
            if (a.participantsNumber < b.participantsNumber) {
                return 1;
            } else if (a.participantsNumber > b.participantsNumber) {
                return -1;
            } else {
                return 0;
            }
        });

        return newVal;
  	}
    
 } 

}
