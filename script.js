
const board = document.getElementById("game-board");
const icons = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cards = icons.concat(icons);
cards.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;

cards.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.innerHTML = "?";
    board.appendChild(card);

    card.addEventListener("click", () => {
        if (lockBoard || card === firstCard || card.classList.contains("revealed")) return;

        card.textContent = card.dataset.icon;
        card.classList.add("revealed");

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            lockBoard = true;
            if (firstCard.dataset.icon === secondCard.dataset.icon) {
                resetCards();
            } else {
                setTimeout(() => {
                    firstCard.textContent = "?";
                    secondCard.textContent = "?";
                    firstCard.classList.remove("revealed");
                    secondCard.classList.remove("revealed");
                    resetCards();
                }, 1000);
            }
        }
    });
});

function resetCards() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
