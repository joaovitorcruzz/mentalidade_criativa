const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").getAttribute("src"),
            cardTwoImg = cardTwo.querySelector("img").getAttribute("src");

        // Verificar se os nomes dos arquivos são iguais
        if (verificarNomesIguais(cardOneImg, cardTwoImg)) {
            matchCards(cardOneImg, cardTwoImg);
            matchedCard++;
            if (matchedCard == 8) {
                setTimeout(() => {
                    return shuffleCard();
                }, 1000);
            }
            cardOne.removeEventListener("click", flipCard);
            cardTwo.removeEventListener("click", flipCard);
            cardOne = cardTwo = "";
            return disableDeck = false;
        } else {
            console.log("Os nomes dos arquivos são diferentes.");

            setTimeout(() => {
                cardOne.classList.add("shake");
                cardTwo.classList.add("shake");
            }, 400);

            setTimeout(() => {
                cardOne.classList.remove("shake", "flip");
                cardTwo.classList.remove("shake", "flip");
                cardOne = cardTwo = "";
                disableDeck = false;
            }, 1200);

        }
    }
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    let arr = [];
    for (let i = 1; i <= 8; i++) {
        arr.push({ folder: "img1", number: i });
        arr.push({ folder: "img2", number: i });
    }
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        let { folder, number } = arr[index];
        imgTag.src = `${folder}/img-${number}.png`;
        card.addEventListener("click", flipCard);
    });
}

function matchCards(img1, img2) {
    if (img1 && img2) {
        console.log("Cartas iguais!");
    }
}

// Função para verificar se os nomes dos arquivos são iguais
function verificarNomesIguais(caminho1, caminho2) {
    let nomeArquivo1 = caminho1.split("/").pop();
    let nomeArquivo2 = caminho2.split("/").pop();

    return nomeArquivo1 === nomeArquivo2;
}

shuffleCard();
