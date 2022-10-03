import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Anime } from 'src/app/models/anime';
import { AnimesFBService } from 'src/app/services/animes-fb.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  anime: Anime;
  edicao: boolean = true;
  formEditar: FormGroup;
  isSubmitted: boolean = false;
  genderList: string[] = ["Ação", "H-Word ( ͡° ͜ʖ ͡°)", "Robôs", "Romance", "Sci-Fi"];
  notas: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  imagem: any;

  constructor(
    private router: Router,
    private animeFBService: AnimesFBService,
    private alertController: AlertController,
    private loading: LoadingController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.anime = nav.extras.state.object;
    this.formEditar = this.formBuilder.group({
      titulo:[this.anime.titulo ,[Validators.required]],
      generos:[this.anime.generos,[Validators.required]],
      totalEp:[this.anime.totalEp],
      assistidosEp:[this.anime.assistidosEp],
      nota: [this.anime.nota],
      imagem: ["", [Validators.required]],
    });
  }

  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.formEditar.valid){
      this.presentAlert("AnimeteK", "Erro",
      "Todos os campos são Obrigatórios!");
      return false;
    }else{
      this.editar();
    }
  }

  aplicar(): void{
    if(this.edicao == false){
      this.edicao = true;
    }else{
      this.edicao = false;
    }
  }

  editar(){
    this.showLoading("Aguarde...", 10000);
    this.animeFBService
      .atualizarImagem(this.imagem, this.formEditar.value, this.anime.imageLink, this.anime.id)
      .then(()=>{
        this.loading.dismiss();
        this.presentAlert("AnimeteK", "Sucesso", "Anime Editado!");
        this.router.navigate(["/my-list"]);
      })
      .catch((error)=>{
        this.loading.dismiss();
        this.presentAlert("AnimeteK", "Erro", "Erro ao editar!");
        console.log(error);
      })
  }

  uploadFile(imagem : any){
    this.imagem = imagem.files;
  }

  excluir(): void{
    this.presentAlertConfirm("AnimeteK", "Excluir anime",
    "Você realmente deseja excluir o anime?");
  }

excluirAnime(){
  this.animeFBService.excluirAnime(this.anime)
  .then(()=>{
    this.presentAlert("AnimeteK", "Sucesso", "anime excluído!");
    this.router.navigate(["/my-list"]);
  })
  .catch((error)=>{
    this.presentAlert("AnimeteK", "Erro", "Erro ao excluir!");
    console.log(error);
  })
  }

  async presentAlert(cabecalho: string, subcabecalho: string,
    mensagem: string) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: mensagem,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentAlertConfirm(cabecalho: string,
    subcabecalho: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: mensagem,
      buttons: [
        {
          text:'Cancelar',
          role:'cancelar',
          cssClass:'secondary',
          handler: ()=>{
            console.log("Cancelou")
          }
        },
        {
          text:'Confirmar',
          role: 'confirm',
          handler: ()=>{
          this.excluirAnime()
          }
        }
      ],
    });
    await alert.present();
  }
  async showLoading(mensagem : string, duracao : number) {
    const loading = await this.loading.create({
      message: mensagem,
      duration: duracao,
    });
    loading.present();
  }
}


