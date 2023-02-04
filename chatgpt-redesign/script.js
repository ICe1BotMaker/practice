const API_KEY = "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";

async function generateText(prompt) {
    const response = await fetch(`https://api.openai.com/v1/engines/text-davinci-003/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 1000,
                n: 1,
                stop: "",
                temperature: 0
            })
        }
    );

    if (!response.ok) {
        throw new Error(`Unable to generate text: ${response.statusText}`);
    }

    const text = await response.json();
    return text.choices[0].text;
}

window.onload = () => {
    const channel_body = document.querySelector(`.channel_body`);
    const message = document.getElementById(`message`);

    i = 0;

    message.onkeyup = e => {
        if (e.key == `Enter`) {
            let value = message.value;
            message.value = ``;

            channel_body.innerHTML += `
            <div class="my-chat">
                <label class="profile_avatar" for="">
                    <div class="avatar">
                        <img src="illust-first-design.jpg" alt="profile">
                    </div>
                </label>
                <div class="text">
                    <p>${value}</p>
                </div>
            </div>
            `;

            channel_body.scrollTo(0, channel_body.scrollHeight)

            i++;

            channel_body.innerHTML += `
            <div class="bot-chat">
                <label class="profile_avatar" for="">
                    <div class="avatar">
                        <img src="app-logo.jpg" alt="profile">
                    </div>
                </label>
                <div class="text">
                    <span class="loading" id="load${i}"><span></span>"ChatGPT-3" is creating content...</span>
                    <p id="b-c${i}"></p>
                </div>
            </div>
            `;
            
            channel_body.scrollTo(0, channel_body.scrollHeight)
            
            generateText(value)
            .then(data => {
                const bc = document.getElementById(`b-c${i}`);
                const loader = document.getElementById(`load${i}`);

                loader.remove();
                bc.innerText = data.replace(`\n\n`, ``);

                channel_body.scrollTo(0, channel_body.scrollHeight)
            })
        }
    }
}