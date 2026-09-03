let mode = "original";


function setMode(newMode) {
    mode = newMode;

    // If there is already a result, randomize it again
    randomize();
}


function randomize() {

    const text = document.getElementById("input").value;

    // Split the input into lines
    const lines = text.split("\n");

    // Get the word and meaning from each line
    const words = lines
        .map(line => {

            const parts = line.trim().split(/\s{2,}/);

            return {
                word: parts[0],
                meaning: parts[1] || ""
            };

        })
        .filter(item => item.word !== "");


    // Fisher-Yates shuffle
    for (let i = words.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [words[i], words[j]] = [words[j], words[i]];
    }


    // Display the words
    document.getElementById("result").innerHTML =
        words.map(item => {

            if (mode === "original") {

                return `
                    <div class="word"
                         onclick="this.classList.toggle('show')">

                        <span>${item.word}</span>

                        <span class="answer">
                            ${item.meaning}
                        </span>

                    </div>
                `;

            } else {

                return `
                    <div class="word"
                         onclick="this.classList.toggle('show')">

                        <span>${item.meaning}</span>

                        <span class="answer">
                            ${item.word}
                        </span>

                    </div>
                `;

            }

        }).join("");
}