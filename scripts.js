let 
    //JOGADORES
    player1 = document.getElementById('nome1'),
    player2 = document.getElementById('nome2'),
    //PEÇAS DO JOGO
    firstPlayer, //JOGADOR QUE INICIA
    firstPlayerTile,//PEÇA DO JOGADOR QUE INICIA
    secondPlayer,//SEGUNDO JOGADOR
    secondPlayerTile,//PEÇA DO SEGUNDO JOGADOR
    turn = true, // CONTROLADOR DE TURNO
  
    //MOEDA PARA DECISÕES ALEATÓRIAS
    coin = parseInt(Math.random()*165),

    //VENCEDOR
    winner;
    

const
    //TELA INICIAL
    STARTSCREEN = document.getElementById('startScreen'),
    MENUNOMES = document.getElementById('nomes'),
    ENVIAR = document.getElementById('enviar');
    

//TELA INICIAL
function jogadores(){
  //TELA DE BOAS VINDAS FORMULÁRIO OK
  WELCOMEOK = document.createElement('div');
  WELCOMEOK.innerHTML = `
    <div id="welcomeOk">
      <div id="firstMsg" class="center flex vert">
          <span id="namesOkMsg" class="msg strip margG paddG">Bem vindos, ${player1.value} e ${player2.value}.\nEstão prontos?</span>
          <div id="firstMsgBtn" class="hor flex around">
            <button id="start" class="margG paddG" onclick="crossOrCircle()">Sim, vamos começar!</button>
            <button id="back" class="margG paddG" onclick="reload()">Não, vamos voltar...</button>
          </div>
      </div>
  `;
  //TELA DE BOAS VINDAS FORMULÁRIO VAZIO OU INCOMPLETO
  const WELCOMENOTOK = document.createElement('div')
        WELCOMENOTOK.innerHTML = `
                <div id="welcomeNotOk">
                  <div class="center flex vert">
                    <span id="namesNotOkMsg" class="msg strip margG paddG">Por favor diga o nome dos jogadores.</span>
                    <button id="back" class="margG paddG" onclick="reload()">Voltar...</button>
                  </div>
                </div>
                `
  //INFORMANDO O NOME DOS JOGADORES
  if(player1.value != "" && player2.value != ""){
    //REMOVENDO ITENS DESNECESSÁRIOS
    STARTSCREEN.removeChild(MENUNOMES);
    //MENSAGEM DE BOAS VINDAS NOMES OK
    STARTSCREEN.appendChild(WELCOMEOK);
  } else {
    //REMOVENDO ITENS DESNECESSÁRIOS
    STARTSCREEN.removeChild(MENUNOMES);
    //ALERTA SOBRE FORMULÁRIO VAZIO OU INCOMPLETO
    STARTSCREEN.appendChild(WELCOMENOTOK);
  }
}

//RECARREGAR A PÁGINA
function reload(){
  document.location.reload();
}

//DECIDINDO QUEM COMEÇA
function crossOrCircle() {
  //JOGADOR QUE INICIA
  
  //USANDO A MOEDA PARA DECIDIR QUEM COMEÇA.
  if (coin % 2 == 0){
    //CASO A MOEDA SEJA PAR
    firstPlayer = player1.value;
    secondPlayer = player2.value
  } else {
    //CASO A MOEDA SEJA ÍMPAR
    firstPlayer = player2.value;
    secondPlayer = player1.value
  }

  //REMOVENDO ITENS DESNECESSÁRIOS
  STARTSCREEN.removeChild(WELCOMEOK);

  //MENSAGEM DE ESCOLHA DE QUEM COMEÇA
  const PLAYFIRST = document.createElement('div')
        PLAYFIRST.innerHTML = `
          <div id="playFirst" class="center flex vert">
              <span id="namesOkMsg" class="msg strip margG paddG">${firstPlayer}, você irá começar. Escolha a sua peça.</span>
              <div id="chooseTiles" class="hor flex between">
                <button id="xTile" class="margG paddG" onclick="tileSelectX()">X</button>
                <button id="oTile" class="margG paddG" onclick="tileSelectO()">O</button>
              </div>
          </div>
        `;
  STARTSCREEN.appendChild(PLAYFIRST);
}

//JOGADOR ESCOLHENDO ENTRE "O" E "X"


// ESCOLHENDO "X"
function tileSelectX(){
  const TILES = document.getElementById('chooseTiles'),
        PLAYFIRST = document.getElementById('playFirst');
        MSGOK = document.getElementById('namesOkMsg')
  
  firstPlayerTile = "X";
  secondPlayerTile = "O";
    
  PLAYFIRST.removeChild(TILES);
  PLAYFIRST.removeChild(MSGOK);
  startLog();
}

// ESCOLHENDO "O"
function tileSelectO(){
  const TILES = document.getElementById('chooseTiles'),
        PLAYFIRST = document.getElementById('playFirst');
        MSGOK = document.getElementById('namesOkMsg')
  
  firstPlayerTile = "O";
  secondPlayerTile = "X";
    
  PLAYFIRST.removeChild(TILES);
  PLAYFIRST.removeChild(MSGOK);
  startLog();
}

//CONFIRMANDO AS ESCOLHAS DOS JOGADORES
function startLog(){
  const STARTLOG = document.createElement('div')
        STARTLOG.innerHTML = `
          <div id="startLog">
            <div class="center flex vert">
                <span id="namesOkMsg" class="msg strip margG paddG">${firstPlayer}, você irá começar e jogará com o "${firstPlayerTile}".<br>${secondPlayer} você jogará com o "${secondPlayerTile}".</span>
            </div>
            <div class="hor flex around">
              <button id="start" class="margG paddG" onclick="game()">Vamos jogar!</button>
              <button id="back" class="margG paddG" onclick="reload()">Escolher de Novo...</button>
            </div>
          </div>
        `;
  STARTSCREEN.appendChild(STARTLOG);
}

//O JOGO
function game() {

  //REMOVENDO ITENS DESNECESSÁRIOS
  document.body.removeChild(STARTSCREEN);
  createGame();
  
  //CRIANDO O JOGO
  function createGame(){
  const GAMEBOARD = document.createElement('div');
  GAMEBOARD.innerHTML = `
    <div id="game" class="flex hor between fullW">
      <div id="leftMenu"class="flex margG paddG centerSelf vert">
        <button onclick="reload()">
          Reiniciar
        </button>
        <div id="title" class="menuTitle">
          <h1>
            <span id="spanTitle">Jogo Da Velha</span>
          </h1>
        </div>
        <div id="selectedPlayer">
          ${firstPlayer}, é a sua vez
        </div>
      </div>
      
      <div id="gameBoard" class="flex fullW fullH between">
        <div id="gameDesk" class="flex center vert">
          <div>
              <div id="1" class="tile" onclick="clickTile(this.id)">-</div>
              <div id="2" class="tile" onclick="clickTile(this.id)">-</div>
              <div id="3" class="tile" onclick="clickTile(this.id)">-</div>
          </div>

          <div>
              <div id="4" class="tile" onclick="clickTile(this.id)">-</div>
              <div id="5" class="tile" onclick="clickTile(this.id)">-</div>
              <div id="6" class="tile" onclick="clickTile(this.id)">-</div>
          </div>

          <div>
              <div id="7" class="tile" onclick="clickTile(this.id)">-</div>
              <div id="8" class="tile" onclick="clickTile(this.id)">-</div>
              <div id="9" class="tile" onclick="clickTile(this.id)">-</div>
          </div>
        </div>
      </div>
    </div>
    `;
    document.body.appendChild(GAMEBOARD);
  }
}

//CONTROLANDO O CLIQUE DE CADA JOGADOR E INSERINDO AS PEÇAS
function clickTile(id) {
  const SELECTEDPLAYER = document.getElementById('selectedPlayer')
  
  let tile = document.getElementById(id)
  if (tile.innerHTML !== '-' || winner != null) {
    return;
  }

  if(turn) {
    tile.innerHTML = firstPlayerTile;
    turn = !turn;
    SELECTEDPLAYER.innerHTML = `${secondPlayer}, é a sua vez`;
    tile.style.color = 'aliceblue';
  } else {
    tile.innerHTML = secondPlayerTile;
    turn = !turn;
    SELECTEDPLAYER.innerHTML = `${firstPlayer}, é a sua vez`;
    tile.style.color = 'aliceblue'
  }

  checkWinner();
}

//TESTANDO SE HÁ UM VENCEDOR
function checkWinner() {
    let tile1 = document.getElementById(1);
    let tile2 = document.getElementById(2);
    let tile3 = document.getElementById(3);
    let tile4 = document.getElementById(4);
    let tile5 = document.getElementById(5);
    let tile6 = document.getElementById(6);
    let tile7 = document.getElementById(7);
    let tile8 = document.getElementById(8);
    let tile9 = document.getElementById(9);

    if (checkSequency(tile1, tile2, tile3)) {
        changeTileColor(tile1, tile2, tile3);
        changeWinner(tile1);
        return;
    }

    if (checkSequency(tile4, tile5, tile6)) {
        changeTileColor(tile4, tile5, tile6);
        changeWinner(tile4);
        return;
    }

    if (checkSequency(tile7, tile8, tile9)) {
        changeTileColor(tile7, tile8, tile9);
        changeWinner(tile7);
        return;
    }

    if (checkSequency(tile1, tile4, tile7)) {
        changeTileColor(tile1, tile4, tile7);
        changeWinner(tile1);
        return;
    }

    if (checkSequency(tile2, tile5, tile8)) {
        changeTileColor(tile2, tile5, tile8);
        changeWinner(tile2);
        return;
    }

    if (checkSequency(tile3, tile6, tile9)) {
        changeTileColor(tile3, tile6, tile9);
        changeWinner(tile3);
        return;
    }

    if (checkSequency(tile1, tile5, tile9)) {
        changeTileColor(tile1, tile5, tile9);
        changeWinner(tile1);
        return;
    }

    if (checkSequency(tile3, tile5, tile7)) {
        changeTileColor(tile3, tile5, tile7);
        changeWinner(tile3);
  }

  //MOSTRANDO O VENCEDOR
  function changeWinner(tile) {
    const SELECTEDPLAYER = document.getElementById('selectedPlayer')
    const SPANTITLE = document.getElementById('spanTitle')
    const LEFTMENU = document.getElementById('leftMenu')

    if (tile.innerHTML = firstPlayerTile){
      winner = firstPlayer
    } else if (tile.innerHTML = secondPlayerTile){
      winner = secondPlayer
    }
    SPANTITLE.innerHTML = `O vencedor<br>é<br>${winner}!`;
    LEFTMENU.removeChild(SELECTEDPLAYER);
  }

  //GANHANDO O JOGO
  function changeTileColor(tile1, tile2, tile3) {
    tile1.style.backgroundImage = 'linear-gradient(rgb(9, 165, 100), rgb(148, 223, 8))';
    tile2.style.backgroundImage = 'linear-gradient(rgb(9, 165, 100), rgb(148, 223, 8))';
    tile3.style.backgroundImage = 'linear-gradient(rgb(9, 165, 100), rgb(148, 223, 8))';
  }

  //TESTANDO O VENCEDOR
  function checkSequency(tile1, tile2, tile3) {
    let isEqual = false;  

    if (
      tile1.innerHTML !== '-' 
      && tile1.innerHTML === tile2.innerHTML 
      && tile2.innerHTML === tile3.innerHTML) {
      isEqual = true;
    }
    return isEqual;
  }
}

//FIM