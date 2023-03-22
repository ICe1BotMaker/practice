const generateBtn = document.getElementById(`generate`);
const range = document.getElementById(`range`);

const password = document.getElementById(`password`);


generateBtn.addEventListener(`click`, e => {
    let rstr = ``;
    
    for (let i = 0; i < range.value; i++) {
        rstr += Math.random().toString(36).substring(2, 3);
    }

    password.innerHTML = rstr;
});