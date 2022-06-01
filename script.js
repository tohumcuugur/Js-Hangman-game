const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message = document.getElementById('success-message');
const loseMessage = document.getElementById('lose-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const popup_lose = document.querySelector('.popup_lose');
const popup_win = document.querySelector('.popup_win');
const message_el = document.getElementById('message');
const play_again_btn_win = document.querySelector('.play-again-win');
const play_again_btn_lose = document.querySelector('.play-again-lose')

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
    const words = ["html", "phyton", "css", "java"]
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    word_el.innerHTML = `
    ${selectedWord.split('').map(letter => `
        <div class="letter">
            <p>
            ${correctLetters.includes(letter) ? letter: ''}
            </p>
        </div>
    `).join('')}
    `;
    const w = word_el.innerText.replace(/\n/g, ''); // \n boşlukları bulur. g ile tüm boşlukları seçmemizi sağlar.,'' birşey eklemesin diye konur yani alt alta değil yanyana gelir gelimeler.
    if (w === selectedWord) {
        popup_win.style.display = 'flex';
        message.innerText = 'Congratulations You Won!'
    }
}

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
    ${wrongLetters.length>0 ? '<h3>Wrong Letters</h3>':''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    if (wrongLetters.length === items.length) {
        popup_lose.style.display = 'flex';
        loseMessage.innerText = 'You Lost!'
    }
}

function displayMessage() {
    message_el.classList.add('show');
    setTimeout(function () {
        message_el.classList.remove('show');
    }, 1000);
}
play_again_btn_win.addEventListener('click', function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup_lose.style.display = 'none';
    popup_win.style.display = 'none';
});
play_again_btn_lose.addEventListener('click', function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup_lose.style.display = 'none';
    popup_win.style.display = 'none';
});
window.addEventListener('keydown', function (e) {
    // console.log('e.key')
    // console.log(e.keyCode)
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                displayMessage();
            }
        }
    }
});
displayWord();