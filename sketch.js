// Classe Bola
class Bola {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.tamanho = 15;
    this.velocidadeX = random(-6, 6); // Velocidade inicial rápida
    this.velocidadeY = random(-4, 4); // Velocidade inicial rápida
    this.incrementoVelocidade = 0.8; // Incremento de velocidade
  }

  mostrar() {
    fill(255, 105, 180); // Cor rosa
    ellipse(this.x, this.y, this.tamanho);
  }

  mover() {
    this.x += this.velocidadeX;
    this.y += this.velocidadeY;
  }

  verificarColisao(raquete) {
    // Colisão com a raquete do jogador
    if (this.x - this.tamanho / 2 < raquete.largura && this.y > raquete.y && this.y < raquete.y + raquete.altura) {
      this.velocidadeX *= -1;
      this.alterarVelocidade();
    }
    
    // Colisão com a raquete do computador
    if (this.x + this.tamanho / 2 > width - raquete.largura && this.y > raquete.y && this.y < raquete.y + raquete.altura) {
      this.velocidadeX *= -1;
      this.alterarVelocidade();
    }
  }

  alterarVelocidade() {
    // Aumentar a velocidade da bola
    this.velocidadeX += this.incrementoVelocidade * Math.sign(this.velocidadeX);
    this.velocidadeY += this.incrementoVelocidade * Math.sign(this.velocidadeY);
  }

  resetar() {
    this.x = width / 2;
    this.y = height / 2;
    this.velocidadeX = random(-6, 6); // Velocidade inicial rápida
    this.velocidadeY = random(-4, 4); // Velocidade inicial rápida
  }

  atualizar() {
    this.mover();
    // Colisão com as barras superior e inferior
    if (this.y - this.tamanho / 2 < 5 || this.y + this.tamanho / 2 > height - 5) {
      this.velocidadeY *= -1;
    }

    // Reiniciar bola se ultrapassar as extremidades da tela
    if (this.x < 0 || this.x > width) {
      this.resetar();
    }
  }
}

let jogadorY;
let computadorY;
let bola;
let alturaJogador = 100;
let alturaComputador = 100;
let larguraRaquete = 10;
let larguraCanvas = 800;
let alturaCanvas = 400;

function setup() {
  createCanvas(larguraCanvas, alturaCanvas);
  jogadorY = height / 2 - alturaJogador / 2;
  computadorY = height / 2 - alturaComputador / 2;
  bola = new Bola();
}

function draw() {
  background(0);

  // Desenhar linha no meio
  stroke(255);
  line(width / 2, 0, width / 2, height);

  // Desenhar raquetes
  noStroke();
  fill(255);
  rect(0, jogadorY, larguraRaquete, alturaJogador);
  rect(width - larguraRaquete, computadorY, larguraRaquete, alturaComputador);

  // Desenhar barras horizontais
  fill(255, 0, 0);
  rect(0, 0, width, 5); // Barra superior
  rect(0, height - 5, width, 5); // Barra inferior

  // Atualizar, mostrar e mover bola
  bola.atualizar();
  bola.mostrar();
  bola.verificarColisao({ largura: larguraRaquete, altura: alturaJogador, y: jogadorY });
  bola.verificarColisao({ largura: larguraRaquete, altura: alturaComputador, y: computadorY });

  // Movimentar raquete do jogador
  if (keyIsDown(UP_ARROW)) {
    jogadorY -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    jogadorY += 5;
  }

  // Conter raquetes dentro dos limites
  jogadorY = constrain(jogadorY, 0, height - alturaJogador);
  computadorY = constrain(computadorY, 0, height - alturaComputador);

  // Movimento da raquete do computador
  computadorY = bola.y - alturaComputador / 2;
}
