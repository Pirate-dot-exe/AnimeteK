import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(search: any[], texto: string): any[] {

    if (texto == ""){
      return search;
    }

    texto = texto.toLowerCase();

    return search.filter( item =>  {
      return item.titulo.toLowerCase().includes( texto )
    })
  }

}
