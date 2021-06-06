import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // Remove the duplicate elements
    let art = value.map((x: { Ponude: any[]; })=>{
      return x.Ponude.map(y=>{ return y.value;});
    }).reduce((acc: string | any[], ele: any, i: any)=>{
      acc = acc.concat(ele);
      return acc;
    });
    return new Set(art);
  }
}
