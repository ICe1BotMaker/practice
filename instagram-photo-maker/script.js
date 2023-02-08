/* Element */
const ctx = document.getElementById(`photo_`);
const shapes = document.querySelectorAll(`.chs_s`);
const type_msg = document.getElementById(`type-msg`);
const target = document.getElementById(`target`);

const title = document.getElementById(`title`);
const highlight = document.getElementById(`highlight`);
const description = document.getElementById(`description`);

const title_ = document.getElementById(`title_`);
const highlight_ = document.getElementById(`highlight_`);
const description_ = document.getElementById(`description_`);

const download_btn = document.getElementById(`download-btn`);

const container = document.querySelector(`.container`);
const container_tools = document.querySelector(`.tools`);
const container_in = document.querySelector(`.photo-maker`);

/* Value */
let dnin = false;
let movin = false;
let movin_t = false;

let dblclick = false;

let circleId = 0;
let circlePosX = 0;
let circlePosY = 0;

let squareId = 0;
let squarePosX = 0;
let squarePosY = 0;

let triangleId = 0;
let trianglePosX = 0;
let trianglePosY = 0;

let textId = 0;
let textPosX = 0;
let textPosY = 0;

/* Shape State */
let chsin = {
    "shape-circle": {
        "name": "circle",
        "state": false,
        "cursor": "crosshair",
        "mouse_down": e => {
            setState_down(() => {
                const circle = document.createElement(`span`);
    
                circleId++;
                circlePosX = e.clientX;
                circlePosY = e.clientY;
    
                circle.style.position = `absolute`;
                circle.style.left = `${e.clientX}px`;
                circle.style.top = `${e.clientY}px`;
                circle.id = `circle-${circleId}`;
                circle.style.background = `black`;
                circle.style.opacity = `0.5`;
                circle.style.borderRadius = `100%`;
                circle.className = `shape`;
    
                ctx.appendChild(circle);
            });
        },
        "mouse_move": e => {
            setState_move(() => {
                const circle = document.getElementById(`circle-${circleId}`);

                if (e.shiftKey == true && e.altKey == false) {
                    circle.style.width = `${e.clientX - circlePosX}px`;
                    circle.style.height = `${e.clientX - circlePosX}px`;
                } else if (e.shiftKey == false && e.altKey == true) {
                    circle.style.left = `${((circlePosX - (e.clientX - circlePosX) / 2) + (e.clientX - circlePosX)) - (e.clientX - circlePosX)}px`;
                    circle.style.top = `${((circlePosY - (e.clientY - circlePosY) / 2) + (e.clientY - circlePosY)) - (e.clientY - circlePosY)}px`;
                    circle.style.width = `${e.clientX - circlePosX}px`;
                    circle.style.height = `${e.clientY - circlePosY}px`;
                } else if (e.shiftKey == true && e.altKey == true) {
                    circle.style.left = `${((circlePosX - (e.clientX - circlePosX) / 2) + (e.clientX - circlePosX)) - (e.clientX - circlePosX)}px`;
                    circle.style.top = `${((circlePosY - (e.clientX - circlePosX) / 2) + (e.clientX - circlePosX)) - (e.clientX - circlePosX)}px`;
                    circle.style.width = `${e.clientX - circlePosX}px`;
                    circle.style.height = `${e.clientX - circlePosX}px`;
                } else {
                    circle.style.width = `${e.clientX - circlePosX}px`;
                    circle.style.height = `${e.clientY - circlePosY}px`;
                }
            });
        },
        "mouse_up": e => {
            setState_up(() => {
                const circle = document.getElementById(`circle-${circleId}`);

                circle.style.opacity = `1`;

                setupOnclick();
            });
        }
    },

    "shape-square": {
        "name": "square",
        "state": false,
        "cursor": "crosshair",
        "mouse_down": e => {
            setState_down(() => {
                const square = document.createElement(`span`);
    
                squareId++;
                squarePosX = e.clientX;
                squarePosY = e.clientY;
    
                square.style.position = `absolute`;
                square.style.left = `${e.clientX}px`;
                square.style.top = `${e.clientY}px`;
                square.id = `square-${squareId}`;
                square.style.background = `black`;
                square.style.opacity = `0.5`;
                square.className = `shape`;
    
                ctx.appendChild(square);
            });
        },
        "mouse_move": e => {
            setState_move(() => {
                const square = document.getElementById(`square-${squareId}`);

                if (e.shiftKey == true && e.altKey == false) {
                    square.style.width = `${e.clientX - squarePosX}px`;
                    square.style.height = `${e.clientX - squarePosX}px`;
                } else if (e.shiftKey == false && e.altKey == true) {
                    square.style.left = `${((squarePosX - (e.clientX - squarePosX) / 2) + (e.clientX - squarePosX)) - (e.clientX - squarePosX)}px`;
                    square.style.top = `${((squarePosY - (e.clientY - squarePosY) / 2) + (e.clientY - squarePosY)) - (e.clientY - squarePosY)}px`;
                    square.style.width = `${e.clientX - squarePosX}px`;
                    square.style.height = `${e.clientY - squarePosY}px`;
                } else if (e.shiftKey == true && e.altKey == true) {
                    square.style.left = `${((squarePosX - (e.clientX - squarePosX) / 2) + (e.clientX - squarePosX)) - (e.clientX - squarePosX)}px`;
                    square.style.top = `${((squarePosY - (e.clientX - squarePosX) / 2) + (e.clientX - squarePosX)) - (e.clientX - squarePosX)}px`;
                    square.style.width = `${e.clientX - squarePosX}px`;
                    square.style.height = `${e.clientX - squarePosX}px`;
                } else {
                    square.style.width = `${e.clientX - squarePosX}px`;
                    square.style.height = `${e.clientY - squarePosY}px`;
                }
            });
        },
        "mouse_up": e => {
            setState_up(() => {
                const sqaure = document.getElementById(`square-${squareId}`);

                sqaure.style.opacity = `1`;

                setupOnclick();
            });
        }
    },

    "shape-triangle": {
        "name": "triangle",
        "state": false,
        "cursor": "crosshair",
        "mouse_down": e => {
            setState_down(() => {
                const triangle = document.createElement(`span`);
    
                triangleId++;
                trianglePosX = e.clientX;
                trianglePosY = e.clientY;
    
                triangle.style.position = `absolute`;
                triangle.style.left = `${e.clientX}px`;
                triangle.style.top = `${e.clientY}px`;
                triangle.id = `triangle-${triangleId}`;
                triangle.style.opacity = `0.5`;
                triangle.className = `shape`;
    
                ctx.appendChild(triangle);
            });
        },
        "mouse_move": e => {
            setState_move(() => {
                const triangle = document.getElementById(`triangle-${triangleId}`);

                if (e.shiftKey == true && e.altKey == false) {
                    triangle.style.borderBottom = `${e.clientX - trianglePosX}px solid black`;
                    triangle.style.borderLeft = `${(e.clientX - trianglePosX) / 2}px solid transparent`;
                    triangle.style.borderRight = `${(e.clientX - trianglePosX) / 2}px solid transparent`;
                } else if (e.shiftKey == false && e.altKey == true) {
                    triangle.style.left = `${((trianglePosX - (e.clientX - trianglePosX) / 2) + (e.clientX - trianglePosX) / 2) - (e.clientX - trianglePosX) / 2}px`;
                    triangle.style.top = `${((trianglePosY - (e.clientY - trianglePosY) / 2) + (e.clientY - trianglePosY) / 2) - (e.clientY - trianglePosY) / 2}px`;
                    triangle.style.borderBottom = `${e.clientY - trianglePosY}px solid black`;
                    triangle.style.borderLeft = `${(e.clientX - trianglePosX) / 2}px solid transparent`;
                    triangle.style.borderRight = `${(e.clientX - trianglePosX) / 2}px solid transparent`;
                } else if (e.shiftKey == true && e.altKey == true) {
                    triangle.style.left = `${((trianglePosX - (e.clientX - trianglePosX) / 2) + (e.clientX - trianglePosX)) - (e.clientX - trianglePosX)}px`;
                    triangle.style.top = `${((trianglePosY - (e.clientX - trianglePosX) / 2) + (e.clientX - trianglePosX)) - (e.clientX - trianglePosX)}px`;
                    triangle.style.borderBottom = `${e.clientX - trianglePosX}px solid black`;
                    triangle.style.borderLeft = `${(e.clientX - trianglePosX) / 2}px solid transparent`;
                    triangle.style.borderRight = `${(e.clientX - trianglePosX) / 2}px solid transparent`;
                } else {
                    triangle.style.borderBottom = `${e.clientY - trianglePosY}px solid black`;
                    triangle.style.borderLeft = `${(e.clientX - trianglePosX) / 2}px solid transparent`;
                    triangle.style.borderRight = `${(e.clientX - trianglePosX) / 2}px solid transparent`;
                }
            });
        },
        "mouse_up": e => {
            setState_up(() => {
                const triangle = document.getElementById(`triangle-${triangleId}`);

                triangle.style.opacity = `1`;

                setupOnclick();
            });
        }
    },

    "shape-text": {
        "name": "text",
        "state": false,
        "cursor": "text",
        "mouse_down": e => {
            setState_down(() => {
                const text = document.createElement(`input`);
    
                textId++;
                textPosX = e.clientX;
                textPosY = e.clientY;
                
                text.style.position = `absolute`;
                text.style.left = `${e.clientX}px`;
                text.style.top = `${e.clientY}px`;
                text.id = `text-${textId}`;
                text.className = `text-input shape`;
                text.type = `text`;
    
                ctx.appendChild(text);
            });
        },
        "mouse_move": e => {
            setState_move(() => { });
        },
        "mouse_up": e => {
            setState_up(() => {
                const text = document.getElementById(`text-${textId}`);

                text.focus();

                shapes.forEach(element => element.id == `shape-cursor` ? clicked(element) : unClicked(element) );

                const finish = () => {
                    const text_ = document.createElement(`span`);
                
                    text_.style.position = `absolute`;
                    text_.style.left = `${textPosX}px`;
                    text_.style.top = `${textPosY}px`;
                    text_.id = `text-${textId}`;
                    text_.textContent = `${text.value}`;
                    text_.className = `shape`;
                    text_.style.color = `white`;

                    text.remove();

                    ctx.appendChild(text_);

                    document.onmousedown = e => {};
                    document.onkeyup = e => {};

                    setupOnclick();
                }

                document.onmousedown = e => finish();
                document.onkeyup = e => e.key == `Enter` ? finish() : ``;
            });
        }
    },

    "shape-cursor": {
        "name": "cursor",
        "state": false,
        "cursor": "default",
        "mouse_down": () => { },
        "mouse_move": () => { },
        "mouse_up": () => { }
    },
};

/* Function */
const unClicked = element => {
    chsin[element.id][`state`] = false;
    ctx.style.cursor = `default`;
    element.style.filter = `opacity(0.6) drop-shadow(0 0 rgb(161, 161, 161))`;
};

const clicked = element => {
    chsin[element.id][`state`] = true;
    type_msg.innerHTML = `type: <b>\`${chsin[element.id][`name`]}\`</b>`;
    ctx.style.cursor = chsin[element.id][`cursor`];
    ctx.onmousedown = chsin[element.id][`mouse_down`];
    ctx.onmousemove = chsin[element.id][`mouse_move`];
    ctx.onmouseup = chsin[element.id][`mouse_up`];
    element.style.filter = `opacity(0.6) drop-shadow(0 0 white)`;
};

const setState_down = f => {
    dnin = true;
    type_msg.style.opacity = `0`;
    f();
}

const setState_move = f => {
    if (dnin == true) {
        type_msg.style.opacity = `0`;
        f();
    }
}

const setState_up = f => {
    dnin = false;
    type_msg.style.opacity = `1`;
    f();
}

const setupOnclick = () => {
    const shapes_ = document.querySelectorAll(`.shape`);

    const posX = document.getElementById(`posX`);
    const posY = document.getElementById(`posY`);
    const rotate = document.getElementById(`rotate`);
    const rotate_ = document.getElementById(`rotate_`);
    const width = document.getElementById(`width`);
    const height = document.getElementById(`height`);
    const border = document.getElementById(`border`);
    const borderRadius = document.getElementById(`border-radius`);
    const textColor = document.getElementById(`text-color`);
    const bgColor = document.getElementById(`bg-color`);

    shapes_.forEach(element => {
        element.onmousedown = e => {
            shapes_.forEach(element_ => {
                if (element.id !== element_.id) {
                    element_.className = element_.className.replace(` resize`, ``);
                }
            });

            element.className += ` resize`;
            target.innerHTML = `HOME > EDITOR > <b>${element.id}</b>`;

            const viewInfo = () => {
                posX.value = element.style.left;
                posY.value = element.style.top;
                // rotate.value = element.style.transform.rotate;
                // rotate_.value = element.style.transform.rotate;
                width.value = element.style.width;
                height.value = element.style.height;
                border.value = element.style.border;
                borderRadius.value = element.style.borderRadius;
                textColor.value = element.style.color;
                bgColor.value = element.style.backgroundColor;
            }

            const editInfo = () => {
                posX.onkeyup = e => { element.style.left = posX.value; }
                posY.onkeyup = e => { element.style.top = posY.value; }
                rotate.onkeyup = e => { element.style.transform = `rotate(${rotate.value}deg)`; }
                rotate_.addEventListener(`input`, e => { element.style.transform = `rotate(${rotate_.value}deg)`; })
                width.onkeyup = e => { element.style.width = width.value; }
                height.onkeyup = e => { element.style.height = height.value; }
                border.onkeyup = e => { element.style.border = border.value; }
                borderRadius.onkeyup = e => { element.style.borderRadius = borderRadius.value; }
                textColor.addEventListener(`input`, e => { element.style.color = textColor.value; })
                bgColor.addEventListener(`input`, e => { element.style.backgroundColor = bgColor.value; })
            }

            viewInfo();
            editInfo();

            ctx.onmousedown = e => {
                movin = true;
            };

            ctx.onmousemove = e => {
                if (movin == true) {
                    element.style.left = `${e.clientX - Number(element.style.width.replace(`px`, ``) / 2)}px`;
                    element.style.top = `${e.clientY - Number(element.style.height.replace(`px`, ``) / 2)}px`;
                    viewInfo();
                }
            };

            ctx.onmouseup = e => {
                movin = false;
            };
        }
    })
}

/* Code */
shapes.forEach(element => {
    element.id.includes(`cursor`) ? clicked(element) : ``;

    element.onclick = e => {
        shapes.forEach(element_ => {
            if (element.id !== element_.id) {
                unClicked(element_);
            }
        });

        clicked(element);
    };
});

container.onmousemove = e => {
    type_msg.style.left = `${e.clientX + 10}px`;
    type_msg.style.top = `${e.clientY - 30}px`;
}

container_tools.onmousedown = e => {
    movin_t = true;
}

container_tools.ondblclick = e => {
    if (dblclick == false) {
        container_in.style.transition = `0.2s`;
        container_in.style.width = `100%`;
        container.style.height = `100%`;
        container_in.style.height = `100%`;
        container_in.style.left = `0`;
        container_in.style.top = `0`;
        container_in.style.borderRadius = `0`;
        document.body.onmousemove = e => {};

        dblclick = true;
    } else {
        container_in.style.width = `70%`;
        container.style.height = `800px`;
        container_in.style.height = `800px`;
        container_in.style.left = `0`;
        container_in.style.top = `0`;
        container_in.style.borderRadius = `10px`;
        setTimeout(() => container_in.style.transition = `0s`);
        document.body.onmousemove = e => {
            if (movin_t == true) {
                container_in.style.left = `${e.clientX - 400}px`;
                container_in.style.top = `${e.clientY - 20}px`;
            }
        };

        dblclick = false;
    }
}

document.body.onmousemove = e => {
    if (movin_t == true) {
        container_in.style.left = `${e.clientX - 400}px`;
        container_in.style.top = `${e.clientY - 20}px`;
    }
}

document.body.onmouseup = e => {
    movin_t = false;
}

setupOnclick();

title.onkeyup = e => { title_.textContent = title.value; }
highlight.onkeyup = e => { highlight_.textContent = highlight.value; }
description.onkeyup = e => { description_.innerHTML = description.value.replaceAll(`\n`, `<br>`); }


download_btn.onclick = e => {
    html2canvas(ctx).then(canvas => {
        const image = canvas.toDataURL(`image/png`, 1);
        const link = window.document.createElement(`a`);

        link.download = `${title.value}.png`;
        link.href = image;
        link.click();
    });
}