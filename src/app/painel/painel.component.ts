import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import {
  Frase
} from '../shared/frase.model';
import {
  FRASES
} from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES;
  public instrucao = 'Traduza a frase:';
  public resposta: string;
  public rodada = 0;
  public rodadaFrase: Frase;

  public progresso = 0;
  public tentativas = 3;

  @Output() public encerrarJogo = new EventEmitter();
  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log('O componente painel foi destruído.');
  }

  atualizaResposta(resposta: Event): void {
    this.resposta = (( < HTMLInputElement > resposta.target).value);
  }

  verificarReposta(): void {
    if (this.rodadaFrase.frasePtBr === this.resposta) {
      this.rodada++;
      this.progresso = this.progresso + (100 / this.frases.length);
      if (this.rodada === 4) {
        this.encerrarJogo.emit('vitoria');
      }
      this.atualizaRodada();
    } else {
      this.tentativas--;
    }
    if (this.tentativas === -1) {
      this.encerrarJogo.emit('derrota');
    }
  }

  atualizaRodada(): void {
    if (this.rodada < FRASES.length) {
      this.rodadaFrase = this.frases[this.rodada];
      this.resposta = '';
    }
  }

}
