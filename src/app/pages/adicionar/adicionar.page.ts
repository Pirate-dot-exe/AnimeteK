import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AnimesFBService } from 'src/app/services/animes-fb.service';

@Component({
  selector: 'app-busca',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})

export class AdicionarPage implements OnInit {
  formAdicionar: FormGroup;
  submited: boolean = false;
  genderList: string[] = ["Ação", "H-Word ( ͡° ͜ʖ ͡°)", "Robôs", "Romance", "Sci-Fi"];
  notas: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  imagem: any;

  constructor(
    private animesFBService: AnimesFBService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private loading: LoadingController,
  ) {
  }

  ngOnInit() {
    this.formAdicionar = this.formBuilder.group({
      titulo: ["", [Validators.required]],
      generos: ["", [Validators.required]],
      nota: [""],
      data: ["", [Validators.required]],
      totalEp: [""],
      assistidosEp: [""],
      imagem: ["", [Validators.required]],  /*A imagem foi necessária ser required para não ser realizado
      tratamento de erro, mas desejava-se ser livre, pois ela não consegue adicionar o item imagem se este 
      for nulo*/
    });
  }

  uploadFile(imagem : any){
    this.imagem = imagem.files;
  }

  submitForm() : boolean{
    this.submited = true;
    if(!this.formAdicionar.valid){
      this.presentAlert("AnimeteK", "Adicionar Error", "Campos inválidos");
      return false;
    }else{
      this.adicionar();
      this.router.navigate(["/my-list"])
    }
  }

  get errorControl(){
    return this.formAdicionar.controls;
  }

  public cancel(){
    this.router.navigate(["/my-list"])
  }
  public adicionar(){
    this.showLoading("Aguarde", 10000);
    this.animesFBService
    .enviarImagem(this.imagem, this.formAdicionar.value)
    .then(()=>{
      this.loading.dismiss();
      this.presentAlert("AnimeteK", "Sucesso", "Anime Adicionado!");
      this.router.navigate(["/my-list"]);
    })
    .catch((error)=>{
      this.loading.dismiss();
      this.presentAlert("AnimeteK", "Erro", "Erro ao cadastrar!");
      console.log(error);
    })

  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
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
