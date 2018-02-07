import { Component, OnInit } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES;
  public instrucao = 'Traduza a frase:';
  public resposta: string;
  public rodada = 0;
  public rodadaFrase: Frase;

  public progresso = 0;
  public tentativas = 3;

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {
  }

  atualizaResposta(resposta: Event): void {
    this.resposta = ((<HTMLInputElement>resposta.target).value);
  }

   verificarReposta(): void {
     if (this.rodadaFrase.frasePtBr === this.resposta) {
        alert('A traudução está correta');
        this.rodada++;
        this.atualizaRodada();
        this.progresso += 25;
        if (this.rodada === 4 ) {
          alert('Fim de jogo, você venceu.');
        }
     } else {
       this.tentativas--;
       if (this.tentativas === -1) {
         alert('Game Over!!!');
       }
       alert('A tradução está incorreta');
     }
   }

   atualizaRodada(): void {
      this.rodadaFrase = this.frases[this.rodada];
      this.resposta = '';
   }

}
