
var height = 9; //Numero de linhas ou tentativas
var width = 5; //Numero de colunas ou letras. Comprimento da palavra

var row = 0; //Linha e tentativa atual
var col = 0; //Letra atual

var gameOver = false; //Controle de quando o jogo finaliza
//PARA OS 4 JOGOS DO DUETO
var gameOver1 = false;
var gameOver2 = false;
var gameOver3 = false;
var gameOver4 = false;

//Lista de palavras
var wordList = ["termo", "ávido", "festa", "honra", "fungo", "poder", "casas", "pobre", "pompa", "ferro", "cacto"];
var wordListSemAcento = wordList.map(RemoveAcentos); //Tirar acentos de todas as palavras da lista

//Palavra dos 4 jogos
var word1;
var word2;
var word3;
var word4;
var word1SemAcento;
var word2SemAcento;
var word3SemAcento;
var word4SemAcento;

var qntJogos = 4;


//Funcao executada ao abrir o arquivo. "Start" da unity
window.onload = function()
{
    wordSelection();
    initialize();
}

//criar palavra
function wordSelection()
{
    //Pegar uma palavra aleatoriamente da lista para os 2 jogos
    word1 = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    word2 = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    word3 = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    word4 = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

    //Gerar outra palavra para nao ter a chance de repetir
    while(word1 == word2 || word1 == word3 || word1 == word4)
    {
        word1 = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    }
    while(word2 == word1 || word2 == word3 || word2 == word4)
    {
        word2 = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    }
    while(word3 == word1 || word3 == word2 || word3 == word4)
    {
        word3 = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    }

    //Maiusculo para as palavras e remover acento
    word1 = word1.toUpperCase();
    word2 = word2.toUpperCase();
    word3 = word3.toUpperCase();
    word4 = word4.toUpperCase();
    word1SemAcento = RemoveAcentos(word1);
    word2SemAcento = RemoveAcentos(word2);
    word3SemAcento = RemoveAcentos(word3);
    word4SemAcento = RemoveAcentos(word4);

    tentativa = "";

    console.log(word1);
    console.log(word2);
    console.log(word3);
    console.log(word4);
}

function createGame(jogo)
{
    //Função para criar o jogo
    for(let r = 0; r < height; r++)
        {
            for (let c = 0; c < width; c++)
            {
                let tile = document.createElement("span"); //Criar um elemento para configurar a "caixa" da letra
                tile.id = jogo + "-" + r.toString() + "-" + c.toString(); //Adicionar um id para localizar este elemento no padrao jogo-linha-coluna
                tile.classList.add("tile"); //Adicionar a classe "tile"
                tile.innerText = ""; //Adicionar um texto vazio para poder receber uma letra
    
                document.getElementById(jogo).appendChild(tile);
                
            }
        }
}

//Funcao que cria o jogo inicial
function initialize()
{
    // --- Criar todos os jogos ---
    for (j = 1; j <= qntJogos; j++)
    {
        //Criar jogos (1 ao 4)
        createGame("jogo" + j);
    }
    

    //---Criar o teclado---
    let keyboard = 
    [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
    ]

    for(let i = 0; i < keyboard.length; i++)
    {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++)
        {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key == "Enger")
            {
                keyTile.id = "Enter";
            }
            else if (key == "⌫")
            {
                keyTile.id = "Backspace";
            }
            else if ("A" <= key && key <= "Z")
            {
                keyTile.id = "Key" + key;
            }

            keyTile.addEventListener("click", processKey);

            if (key == "Enter")
            {
                keyTile.classList.add("enter-key-tile");
            }
            else
            {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }


    //Receber uma letra
    document.addEventListener("keyup", (e) => 
    {
            processInput(e);
    }) //Ainda no evento
}


function processKey()
{
    let e = {"code": this.id};
    processInput(e);
}

function adicionarLetra(jogo, letra)
{
    let currTile = document.getElementById(jogo + "-" + row.toString() + "-" + col.toString());
    if (currTile.innerText == "")
    {
        currTile.innerText = letra[3]; //Pegar somente a letra "A" de KeyA(0123)
    }
}

function removerLetra(jogo)
{
    let currTile = document.getElementById(jogo + "-" + row.toString() + "-" + col.toString());
    currTile.innerText = ""; //Esvaziar a letra
}

function processInput(e)
{
    if (gameOver) return; //Verificar se o jogo ja finalizou para nao receber mais nenhum comando

        //alert(e.code); //Proposito de teste 

        if ("KeyA" <= e.code && e.code <= "KeyZ")
        {
            //Verificar se esta numa posicao que ainda pode receber letra
            if (col < width)
            {
                //Se for fazer um loop com gameover, é necessário usar o gameOver como vetor, pegando o valor como gameOver[j] dentro do loop
                //--- JOGO 1 ---
                if (!gameOver1) //Se acabou o jogo 1
                {
                    adicionarLetra("jogo1", e.code);
                }

                //--- JOGO 2 ---
                if (!gameOver2) //Se acabou o jogo 2
                {
                    adicionarLetra("jogo2", e.code);
                }

                //--- JOGO 3 ---
                if (!gameOver3) //Se acabou o jogo 3
                {
                    adicionarLetra("jogo3", e.code);
                }

                //--- JOGO 4 ---
                if (!gameOver4) //Se acabou o jogo 4
                {
                    adicionarLetra("jogo4", e.code);
                }
                
                tentativa += e.code[3];

            }

            col += 1; //Avancar uma coluna
        }
        else if (e.code == "Backspace")
        {
            if (col > width) //Correcao de bug
            {
                col = width;
            }

            if (0 < col && col <= width)
            {
                col -= 1; //Voltar uma coluna

                //--- JOGO 1 ---
                if (!gameOver1)
                {
                    removerLetra("jogo1");
                }
                //--- JOGO 2 ---
                if (!gameOver2)
                {
                    removerLetra("jogo2");
                }
                //--- JOGO 3 ---
                if (!gameOver3)
                {
                    removerLetra("jogo3");
                }
                //--- JOGO 4 ---
                if (!gameOver4)
                {
                    removerLetra("jogo4");
                }
                

                tentativa = tentativa.substring(0, tentativa.length - 1);
            }
        }
        else if (e.code == "Enter")
        {
            update(); //Executa a funcao que ira verificar se a palavra esta correta
        }

        if (!gameOver && row == height) //Se o jogo nao finalizou
        {
            gameOver = true;
            document.getElementById("resposta").innerText = "Palavras: " + word1 + ", " + word2 + ", " + word3 + ", " + word4; //Pegar a palavra dita como resposta nos 2 jogos
        }
}

//Remover acentos
function RemoveAcentos(str)
{
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function verificarLetra(letraSAcento, jogo, gameOverJogo, tentativa)
{
    let correto = 0; //Variavel que controla a quantia de letras corretas na palavra
    let letterCount = [];
    for (let i = 0; i < letraSAcento.length; i++)
    {
        letter = letraSAcento[i];
        if (letterCount[letter])
        {
        letterCount[letter] += 1;
        }
        else
        {
            letterCount[letter] = 1;
        }
        //CASAS - EXEMPLO DE EXECUÇÃO:
        //letterCount[C] = 1;
        //letterCount[A] = 2;
        //letterCount[S] = 2;
    }

    for (let c = 0; c < width; c++) //Varrer todas as letras da palavra
    {
        let currTile = document.getElementById(jogo + "-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
        let letter = currTile.innerText; //Receber a letra em uma variavel

        if (letraSAcento[c] == letter) //Se a letra estiver correta e no lugar correto
        {
            currTile.classList.add("correto");
            correto += 1;

            letterCount[letter] -= 1;

            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.remove("contem");
            keyTile.classList.add("correto");
        }

        if (correto == width)
        {
            gameOverJogo = true;
        }
    }

    for (let c = 0; c < width; c++)
    {
        let currTile = document.getElementById(jogo + "-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
        let letter = currTile.innerText; //Receber a letra em uma variavel

        if (!currTile.classList.contains("correto"))
        {
            if (letraSAcento.includes (letter) && letterCount[letter] > 0)
            {
                currTile.classList.add("contem");

                let keyTile = document.getElementById("Key" + letter);
                if (!keyTile.classList.contains("correto"))
                {
                keyTile.classList.add("contem");
                }

                letterCount[letter] -= 1;
            }
            else
            {
                currTile.classList.add("errado");
                let keyTile = document.getElementById("Key" + letter);
                keyTile.classList.add("errado");
            }
        }
    }

    //Verificar se a palavra tem acento
    for (let c = 0; c < width; c++)
    {
        let currTile = document.getElementById(jogo + "-" + row.toString() + "-" + c.toString());
        currTile.innerText = tentativa[c].toUpperCase();
    }
    return gameOverJogo; //Retornar para garantir que o respectivo jogo termine se for verdadeiro
}

//Atualiza as letras
function update()
{
    document.getElementById("resposta").innerText = "";

    tentativa = tentativa.toLowerCase();

    if (!wordListSemAcento.includes(tentativa))
    {
        document.getElementById("resposta").innerText = "Palavra não aceita";
        return;
    }

    //Iniciar a verificação no jogo

    //--- JOGO 1 ---
    if (!gameOver1)
    {
        gameOver1 = verificarLetra(word1SemAcento, "jogo1", gameOver1, tentativa);
    }
    
    //--- JOGO 2 ---
    if (!gameOver2)
    {
        gameOver2 = verificarLetra(word2SemAcento, "jogo2", gameOver2, tentativa);
    }

    //--- JOGO 3 ---
    if (!gameOver3)
    {
        gameOver3 = verificarLetra(word3SemAcento, "jogo3", gameOver3, tentativa);
    }

    //--- JOGO 4 ---
    if (!gameOver4)
    {
        gameOver4 = verificarLetra(word4SemAcento, "jogo4", gameOver4, tentativa);
    }
    

    //Fim do jogo
    if (gameOver1 && gameOver2 && gameOver3 && gameOver4)
    {
        console.log("todos os jogos acabaram");
        gameOver = true;
        document.getElementById("resposta").innerText = "Palavras: " + word1 + ", " + word2 + ", " + word3 + ", " + word4; //mostrar a resposta
    }


    row += 1;
    col = 0;
    tentativa = "";
}