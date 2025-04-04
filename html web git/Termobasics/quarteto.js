
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

//Funcao que cria o jogo inicial
function initialize(){

    //---Criar o jogo 1---
    for(let r = 0; r < height; r++)
    {
        for (let c = 0; c < width; c++)
        {
            let tile = document.createElement("span"); //Criar um elemento para configurar a "caixa" da letra
            tile.id = "jogo1-" + r.toString() + "-" + c.toString(); //Adicionar um id para localizar este elemento no padrao jogo-linha-coluna
            tile.classList.add("tile"); //Adicionar a classe "tile"
            tile.innerText = ""; //Adicionar um texto vazio para poder receber uma letra

            document.getElementById("jogo1").appendChild(tile);
            
        }
    }
    //---Criar o jogo 2---
    for(let r = 0; r < height; r++)
    {
        for (let c = 0; c < width; c++)
        {
            let tile = document.createElement("span"); //Criar um elemento para configurar a "caixa" da letra
            tile.id = "jogo2-" + r.toString() + "-" + c.toString(); //Adicionar um id para localizar este elemento no padrao jogo-linha-coluna
            tile.classList.add("tile"); //Adicionar a classe "tile"
            tile.innerText = ""; //Adicionar um texto vazio para poder receber uma letra

            document.getElementById("jogo2").appendChild(tile);
            
        }
    }
    //---Criar o jogo 3---
    for(let r = 0; r < height; r++)
    {
        for (let c = 0; c < width; c++)
        {
            let tile = document.createElement("span"); //Criar um elemento para configurar a "caixa" da letra
            tile.id = "jogo3-" + r.toString() + "-" + c.toString(); //Adicionar um id para localizar este elemento no padrao jogo-linha-coluna
            tile.classList.add("tile"); //Adicionar a classe "tile"
            tile.innerText = ""; //Adicionar um texto vazio para poder receber uma letra

            document.getElementById("jogo3").appendChild(tile);
            
        }
    }
    //---Criar o jogo 4---
    for(let r = 0; r < height; r++)
    {
        for (let c = 0; c < width; c++)
        {
            let tile = document.createElement("span"); //Criar um elemento para configurar a "caixa" da letra
            tile.id = "jogo4-" + r.toString() + "-" + c.toString(); //Adicionar um id para localizar este elemento no padrao jogo-linha-coluna
            tile.classList.add("tile"); //Adicionar a classe "tile"
            tile.innerText = ""; //Adicionar um texto vazio para poder receber uma letra

            document.getElementById("jogo4").appendChild(tile);
            
        }
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

function processInput(e)
{
    if (gameOver) return; //Verificar se o jogo ja finalizou para nao receber mais nenhum comando

        //alert(e.code); //Proposito de teste 

        if ("KeyA" <= e.code && e.code <= "KeyZ")
        {
            //Verificar se esta numa posicao que ainda pode receber letra
            if (col < width)
            {
                //--- JOGO 1 ---
                if (!gameOver1) //Se acabou o jogo 1
                {
                    let currTile = document.getElementById("jogo1-" + row.toString() + "-" + col.toString());
                    if (currTile.innerText == "")
                    {
                    currTile.innerText = e.code[3]; //Pegar somente a letra "A" de KeyA(0123)
                    }
                }

                //--- JOGO 2 ---
                if (!gameOver2) //Se acabou o jogo 2
                {
                    let currTile = document.getElementById("jogo2-" + row.toString() + "-" + col.toString());
                    if (currTile.innerText == "")
                    {
                    currTile.innerText = e.code[3]; //Pegar somente a letra "A" de KeyA(0123)
                    }
                }

                //--- JOGO 3 ---
                if (!gameOver3) //Se acabou o jogo 3
                {
                    let currTile = document.getElementById("jogo3-" + row.toString() + "-" + col.toString());
                    if (currTile.innerText == "")
                    {
                    currTile.innerText = e.code[3]; //Pegar somente a letra "A" de KeyA(0123)
                    }
                }

                //--- JOGO 4 ---
                if (!gameOver4) //Se acabou o jogo 4
                {
                    let currTile = document.getElementById("jogo4-" + row.toString() + "-" + col.toString());
                    if (currTile.innerText == "")
                    {
                    currTile.innerText = e.code[3]; //Pegar somente a letra "A" de KeyA(0123)
                    }
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
                    let currTile = document.getElementById("jogo1-" + row.toString() + "-" + col.toString());
                    currTile.innerText = ""; //Esvaziar a letra
                }
                //--- JOGO 2 ---
                if (!gameOver2)
                {
                    let currTile = document.getElementById("jogo2-" + row.toString() + "-" + col.toString());
                    currTile.innerText = ""; //Esvaziar a letra
                }
                //--- JOGO 3 ---
                if (!gameOver3)
                {
                    let currTile = document.getElementById("jogo3-" + row.toString() + "-" + col.toString());
                    currTile.innerText = ""; //Esvaziar a letra
                }
                //--- JOGO 4 ---
                if (!gameOver4)
                {
                    let currTile = document.getElementById("jogo4-" + row.toString() + "-" + col.toString());
                    currTile.innerText = ""; //Esvaziar a letra
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
        let correto = 0; //Variavel que controla a quantia de letras corretas na palavra
        let letterCount = [];
        for (let i = 0; i < word1SemAcento.length; i++)
        {
            letter = word1SemAcento[i];
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
            let currTile = document.getElementById("jogo1-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
            let letter = currTile.innerText; //Receber a letra em uma variavel

            if (word1SemAcento[c] == letter) //Se a letra estiver correta e no lugar correto
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
                gameOver1 = true;
            }
        }

        for (let c = 0; c < width; c++)
        {
            let currTile = document.getElementById("jogo1-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
            let letter = currTile.innerText; //Receber a letra em uma variavel

            if (!currTile.classList.contains("correto"))
            {
                if (word1SemAcento.includes (letter) && letterCount[letter] > 0)
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
            let currTile = document.getElementById("jogo1-" + row.toString() + "-" + c.toString())
            currTile.innerText = tentativa[c].toUpperCase();
        }
    }


    //--- JOGO 2 ---
    if (!gameOver2)
    {
        let correto = 0; //Variavel que controla a quantia de letras corretas na palavra
        let letterCount = [];
        for (let i = 0; i < word2SemAcento.length; i++)
        {
            letter = word2SemAcento[i];
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
            let currTile = document.getElementById("jogo2-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
            let letter = currTile.innerText; //Receber a letra em uma variavel

            if (word2SemAcento[c] == letter) //Se a letra estiver correta e no lugar correto
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
                gameOver2 = true;
            }
        }

        for (let c = 0; c < width; c++)
        {
            let currTile = document.getElementById("jogo2-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
            let letter = currTile.innerText; //Receber a letra em uma variavel

            if (!currTile.classList.contains("correto"))
            {
                if (word2SemAcento.includes (letter) && letterCount[letter] > 0)
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
            let currTile = document.getElementById("jogo2-" + row.toString() + "-" + c.toString())
            currTile.innerText = tentativa[c].toUpperCase();
        }
    }
    

    //--- JOGO 3 ---
    if (!gameOver3)
    {
        let correto = 0; //Variavel que controla a quantia de letras corretas na palavra
        let letterCount = [];
        for (let i = 0; i < word3SemAcento.length; i++)
        {
            letter = word3SemAcento[i];
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
            let currTile = document.getElementById("jogo3-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
            let letter = currTile.innerText; //Receber a letra em uma variavel

            if (word3SemAcento[c] == letter) //Se a letra estiver correta e no lugar correto
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
                gameOver3 = true;
            }
        }

        for (let c = 0; c < width; c++)
        {
            let currTile = document.getElementById("jogo3-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
            let letter = currTile.innerText; //Receber a letra em uma variavel

            if (!currTile.classList.contains("correto"))
            {
                if (word3SemAcento.includes (letter) && letterCount[letter] > 0)
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
            let currTile = document.getElementById("jogo3-" + row.toString() + "-" + c.toString())
            currTile.innerText = tentativa[c].toUpperCase();
        }
    }


    //--- JOGO 4 ---
    if (!gameOver4)
    {
        let correto = 0; //Variavel que controla a quantia de letras corretas na palavra
        let letterCount = [];
        for (let i = 0; i < word4SemAcento.length; i++)
        {
            letter = word4SemAcento[i];
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
            let currTile = document.getElementById("jogo4-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
            let letter = currTile.innerText; //Receber a letra em uma variavel

            if (word4SemAcento[c] == letter) //Se a letra estiver correta e no lugar correto
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
                gameOver4 = true;
            }
        }

        for (let c = 0; c < width; c++)
        {
            let currTile = document.getElementById("jogo4-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
            let letter = currTile.innerText; //Receber a letra em uma variavel

            if (!currTile.classList.contains("correto"))
            {
                if (word4SemAcento.includes (letter) && letterCount[letter] > 0)
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
            let currTile = document.getElementById("jogo4-" + row.toString() + "-" + c.toString())
            currTile.innerText = tentativa[c].toUpperCase();
        }
    }



    //Fim do jogo
    if (gameOver1 && gameOver2 && gameOver3 && gameOver4)
    {
        gameOver = true;
        document.getElementById("resposta").innerText = "Palavras: " + word1 + ", " + word2 + ", " + word3 + ", " + word4; //mostrar a resposta
    }


    row += 1;
    col = 0;
    tentativa = "";
}