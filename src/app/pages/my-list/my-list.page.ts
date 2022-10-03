import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from 'src/app/models/anime';
import { AnimesFBService } from 'src/app/services/animes-fb.service';


//suggestion e favorites vira apenas tags

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.page.html',
  styleUrls: ['./my-list.page.scss'],
})
export class MyListPage {
  meus_animes: Anime[];
  searchItems: string = "";

  constructor(
    private animeFBService: AnimesFBService,
    private router: Router,
  ) {
    this.carregarAnimes();
  }
  carregarAnimes(){
    this.animeFBService.getAnimes().subscribe(res => {
      this.meus_animes = res.map(c => {
        return {
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Anime,
        } as Anime;
      })
    });
  }

  searchMyAnime( event ){
    this.searchItems = event.detail.value;
  }
  searchByTag( event ){
    console.log("event: ", event)
    this.searchItems = event.detail.value;
  }

  irParaAdicionar(){
    this.router.navigate(['/adicionar']);
  }
  
  irParaEdicao(anime: Anime){
    this.router.navigateByUrl("/editar",
      { state: {object: anime} }
    )
  }

}
