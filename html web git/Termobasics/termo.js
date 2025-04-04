
var height = 6; //Numero de linhas ou tentativas
var width = 5; //Numero de colunas ou letras. Comprimento da palavra

var row = 0; //Linha e tentativa atual
var col = 0; //Letra atual

var gameOver = false; //Controle de quando o jogo finaliza

//var word = "AULAS"; //Palavra teste
//Lista de palavras
var wordList = ["termo", "ávido", "festa", "honra", "fungo", "poder", "casas", "pobre", "pompa", "ferro", "cacto"];
var wordListSemAcento = wordList.map(RemoveAcentos); //Tirar acentos de todas as palavras da lista

var word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase(); //Pegar uma palavra aleatoriamente da lista
var wordSemAcento = RemoveAcentos(word); //Tirar acento da palavra word

console.log(word); //Apresentar a palavra no log para testes

//Funcao executada ao abrir o arquivo. "Start" da unity
window.onload = function()
{
    initialize();
}

//Funcao que cria o jogo inicial
function initialize(){

    //---Criar o jogo---
    for(let r = 0; r < height; r++)
    {
        for (let c = 0; c < width; c++)
        {
            let tile = document.createElement("span"); //Criar um elemento para configurar a "caixa" da letra
            tile.id = "jogo-" + r.toString() + "-" + c.toString(); //Adicionar um id para localizar este elemento no padrao jogo-linha-coluna
            tile.classList.add("tile"); //Adicionar a classe "tile"
            tile.innerText = ""; //Adicionar um texto vazio para poder receber uma letra

            document.getElementById("jogo").appendChild(tile);
            
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
                let currTile = document.getElementById("jogo-" + row.toString() + "-" + col.toString());
                if (currTile.innerText == "")
                {
                    currTile.innerText = e.code[3]; //Pegar somente a letra "A" de KeyA(0123)
                }

                col += 1; //Avancar uma coluna
            }
        }
        else if (e.code == "Backspace")
        {
            if (0 < col && col <= width)
            {
                col -= 1; //Voltar uma coluna

                let currTile = document.getElementById("jogo-" + row.toString() + "-" + col.toString());
                currTile.innerText = ""; //Esvaziar a letra
            }
        }
        else if (e.code == "Enter")
        {
            update(); //Executa a funcao que ira verificar se a palavra esta correta
        }

        if (!gameOver && row == height) //Se o jogo nao finalizou
        {
            gameOver = true;
            document.getElementById("resposta").innerText = word; //Pegar a palavra dita como resposta
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
    let tentativa = "";
    document.getElementById("resposta").innerText = "";
    for (let c = 0; c < width; c++)
    {
        let currTile = document.getElementById("jogo-" + row.toString() + "-" + c.toString());
        let letter = currTile.innerText;
        tentativa += letter;
    }
    tentativa = tentativa.toLowerCase();
    if (!wordListSemAcento.includes(tentativa))
    {
        document.getElementById("resposta").innerText = "Palavra não aceita";
        return;
    }

    //Iniciar a verificação no jogo
    let correto = 0; //Variavel que controla a quantia de letras corretas na palavra
    let letterCount = [];
    for (let i = 0; i < wordSemAcento.length; i++)
    {
        letter = wordSemAcento[i];
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
        let currTile = document.getElementById("jogo-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
        let letter = currTile.innerText; //Receber a letra em uma variavel

        if (wordSemAcento[c] == letter) //Se a letra estiver correta e no lugar correto
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
            gameOver = true;
        }
    }

    for (let c = 0; c < width; c++)
    {
        let currTile = document.getElementById("jogo-" + row.toString() + "-" + c.toString()); //Localizar as letras da tentativa atual
        let letter = currTile.innerText; //Receber a letra em uma variavel

        if (!currTile.classList.contains("correto"))
        {
            if (wordSemAcento.includes (letter) && letterCount[letter] > 0)
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
        let currTile = document.getElementById("jogo-" + row.toString() + "-" + c.toString())
        currTile.innerText = tentativa[c].toUpperCase();
    }

    row += 1;
    col = 0;
}