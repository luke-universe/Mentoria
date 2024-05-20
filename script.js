// chamando variáveis
const progressBar = document.getElementById("progressBar");
const buttonPlay = document.querySelector('#play');
const buttonPause = document.querySelector('#pause');
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");
const buttonAvancar = document.getElementById('avancar');
const buttonVoltar = document.getElementById('voltar');

const musicTitle = document.querySelector('.desc-musica p');
const musicArtist = document.querySelector('.desc-musica span');
const musicImage = document.querySelector('.conteudo-musica img');
const cardPlayer = document.querySelector('.card-player');

// vetor com as músicas e informações
const playlist = [
  {
    title: "Space Song",
    artist: "Beach House",
    audio: "./assets/Space-song.mp3",
    image: "./assets/fundo-musica.jpg",
  },
  {
    title: "Cria de Favela",
    artist: "Annita",
    audio: "./assets/Cria-de-favela.mp3",
    image: "./assets/fundo-musica-2.jpg",
  },
  {
    title: "Poema",
    artist: "Ney Matogrosso",
    audio: "./assets/Poema.mp3",
    image: "./assets/fundo-musica-3.jpg",
  }
];

const music = new Audio();
let interval;
let currentIndex = 0;

// funções
function carregarMusica(currentIndex) {
  const musica = playlist[currentIndex];
  musicTitle.textContent = musica.title;
  musicArtist.textContent = musica.artist;
  musicImage.src = musica.image;
  music.src = musica.audio;
  
  music.addEventListener('loadedmetadata', function() {
    tempoTotal.textContent = formatarTempo(music.duration);
  });
  
  tempoAtual.textContent = "00:00";
  progressBar.value = 0;
//essa parte que muda a cor do card, não precisa colocar
  cardPlayer.classList.remove('SpaceSong', 'CriadeFa', 'Poema');

  if (currentIndex === 0) {
    cardPlayer.classList.add('SpaceSong');
  } else if (currentIndex === 1) {
    cardPlayer.classList.add('CriadeFa');
  } else if (currentIndex === 2) {
    cardPlayer.classList.add('Poema');
  }
}


function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

function updateMusicTime() {
  const progresso = (music.currentTime / music.duration) * 100;
  progressBar.value = progresso;
  tempoAtual.textContent = formatarTempo(music.currentTime);
}

function avancar() {
    // Avançar para a próxima música na lista
    currentIndex = (currentIndex + 1) % playlist.length;
    
    // Carregar e reproduzir a próxima música
    carregarMusica(currentIndex);
    play();
  }
  
  
function play() {
  buttonPlay.classList.toggle('hide');
  buttonPause.classList.toggle('hide');
  music.play();
  interval = setInterval(updateMusicTime, 1000);
}

function pause() {
  buttonPlay.classList.toggle('hide');
  buttonPause.classList.toggle('hide');
  music.pause();
  clearInterval(interval);
}

function voltar() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  carregarMusica(currentIndex);
  play();
}

function setProgress(){
  const progressBarra = progressBar.value;
  const tempo = (progressBarra/100)* music.duration;
  music.currentTime = tempo;
}

carregarMusica(currentIndex); 
buttonPlay.addEventListener('click', play);
buttonPause.addEventListener('click', pause);
buttonAvancar.addEventListener('click', avancar);
buttonVoltar.addEventListener('click', voltar);
progress
