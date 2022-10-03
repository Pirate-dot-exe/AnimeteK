import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Anime } from '../models/anime'
import { finalize } from 'rxjs/operators'

import { getStorage, ref, deleteObject } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class AnimesFBService {
  private PATH: string = "animes";

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
  ) { }

  getAnime(id: string){
    return this.angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }
  getAnimes(){
    return this.angularFirestore
      .collection(this.PATH)
      .snapshotChanges();
  }
  inserirAnime(anime: Anime){
    return this.angularFirestore
      .collection(this.PATH)
      .add({
        titulo: anime.titulo,
        generos: anime.generos,
        imageLink: anime.imageLink,
        nota: anime.nota,
        data: anime.data,
        totalEp: anime.totalEp,
        assistidosEp: anime.assistidosEp,
      })
  }
  editarAnime(anime: Anime, id: string, newPath: string){
    console.log("EditarAnime: " , newPath)
    return this.angularFirestore
      .collection(this.PATH)
      .doc(id)
      .update({
        titulo: anime.titulo,
        generos: anime.generos,
        nota: anime.nota,
        totalEp: anime.totalEp,
        assistidosEp: anime.assistidosEp,
        imageLink: newPath
      })
  }
  excluirAnime(anime: Anime){
    this.excluirImagem(anime.imageLink)
    return this.angularFirestore.collection(this.PATH).doc(anime.id).delete();
  }

  atualizarImagem(imagem: any, anime: Anime, lastPath: string, id: string){
    this.excluirImagem(lastPath)
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){  //Verifica se é do tipo imagem ("/image")
      console.error("Tipo não reconhecido ou não suportado");
      return;
    }
    const path = `images/${new Date().getTime()}_${file.name}`; //deve ser com craze ` !== '
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        let imageLink = fileRef.getDownloadURL()
        imageLink.subscribe((resp) => {
          anime.imageLink = resp
          this.editarAnime(anime, id, resp)
        })
      })
    ).subscribe()
    return task;
  }

  enviarImagem(imagem: any, anime: Anime){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){  //Verifica se é do tipo imagem ("/image")
      console.error("Tipo não reconhecido ou não suportado");
      return;
    }
    const path = `images/${new Date().getTime()}_${file.name}`; //deve ser com craze ` !== '
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        let imageLink = fileRef.getDownloadURL()
        imageLink.subscribe((resp) => {
          anime.imageLink = resp
          this.inserirAnime(anime)
        })
      })
    ).subscribe()
    return task;
  }

  excluirImagem(path: string){
    console.log("Excluindo imagem: ", path)
    const storage = getStorage();
    const reference = ref(storage, path);
    deleteObject(reference).then(() => {}).catch((error) => {
      console.log("Um erro ocorreu!");
    });
  }
}
