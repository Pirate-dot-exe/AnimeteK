import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genero'
})
export class GeneroPipe implements PipeTransform {

  transform(search: any[], texto: string): any[] {

    if (texto == ""){
      return search;
    }

    texto = texto.toLowerCase();

    return search.filter( item =>  {
      return item.genero.toLowerCase().includes( texto )
    })
  }
}
