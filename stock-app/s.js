const range = document.getElementById(`range`);
const price = document.getElementById(`price`);

const buyBtn = document.getElementById(`buy`);

const buyModal = document.getElementById(`buyModal`);
const buyItemBtn = document.getElementById(`buyItem`);
const lastPrice = document.getElementById(`last-price`);
const closeBuyModal = buyModal.querySelector(`.close`);

const invalidItem = document.querySelectorAll(`.invalid-item`);

Element.prototype.open = function() {
    const bg = document.getElementById(`${this.id}-bg`);
    
    bg.style.display = `flex`;

    setTimeout(() => {
        bg.style.opacity = `1`;

        this.style.transform = `scale(1)`;
        this.style.opacity = `1`;
    });
}

Element.prototype.close = function() {
    const bg = document.getElementById(`${this.id}-bg`);
    
    bg.style.opacity = `0`;

    this.style.transform = `scale(.75)`;
    this.style.opacity = `0`;

    setTimeout(() => {
        bg.style.display = `none`;
    }, 250);
}

range.addEventListener(`input`, e => {
    price.innerHTML = Number(range.value).toLocaleString();
});

buyBtn.addEventListener(`click`, e => {
    lastPrice.innerHTML = Number(range.value).toLocaleString();
    buyModal.open();
});

buyItemBtn.addEventListener(`click`, e => {
    buyModal.close();
});

closeBuyModal.addEventListener(`click`, e => {
    buyModal.close();
});

invalidItem.forEach(Element => {
    const invalidText = Element.querySelector(`.invalid`);
    const invalidInput = Element.querySelector(`input`);

    const setInvalid = (cmd, text, input) => {
        if (cmd) {
            text.style.height = `0`;
            input.style.border = `2px solid rgb(121, 163, 255)`;

            input.onfocus = e => { input.style.border = `2px solid rgb(121, 163, 255)`; }
            input.onblur = e => { input.style.border = `2px solid rgb(226, 226, 226)`; }
        } else {
            text.style.height = `21px`;
            input.style.border = `2px solid rgb(255, 45, 90)`;

            input.onfocus = e => { input.style.border = `2px solid rgb(255, 45, 90)`; }
            input.onblur = e => { input.style.border = `2px solid rgb(226, 226, 226)`; }
        }
    }
    
    invalidInput.onkeyup = e => {
        if (invalidText.textContent.includes(`number`)) {
            const reg = new RegExp(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}/);

            setInvalid(reg.test(invalidInput.value) && invalidInput.value.length == 19, invalidText, invalidInput);
        } else if (invalidText.textContent.includes(`period`)) {
            const reg = new RegExp(/^[0-9]{2}\/[0-9]{2}/);

            setInvalid(reg.test(invalidInput.value) && invalidInput.value.length == 5, invalidText, invalidInput);
        } else if (invalidText.textContent.includes(`svc`)) {
            const reg = new RegExp(/^[0-9]{3}/);
            
            setInvalid(reg.test(invalidInput.value) && invalidInput.value.length == 3, invalidText, invalidInput);
        } else if (invalidText.textContent.includes(`password`)) {
            setInvalid(invalidInput.value.length != 0, invalidText, invalidInput);
        }
    }
});