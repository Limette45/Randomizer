let mode = localStorage.getItem("wordRandomizer_mode") || "original";


// Load saved input when the page opens
window.addEventListener("DOMContentLoaded", () => {

    const savedText = localStorage.getItem("wordRandomizer_input");

    if (savedText !== null) {
        document.getElementById("input").value = savedText;
    }

    const savedResult = localStorage.getItem("wordRandomizer_result");

    if (savedResult !== null) {
        document.getElementById("result").innerHTML = savedResult;
    }

});


// Save textarea whenever it is changed
document.getElementById("input").addEventListener("input", () => {
    localStorage.setItem(
        "wordRandomizer_input",
        document.getElementById("input").value
    );
});


function setMode(newMode) {

    mode = newMode;

    localStorage.setItem("wordRandomizer_mode", mode);

    // If there is already a result, randomize it again
    randomize();
}


function randomize() {

    const text = document.getElementById("input").value;

    // Save input
    localStorage.setItem("wordRandomizer_input", text);

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
    const result = words.map(item => {

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


    document.getElementById("result").innerHTML = result;

    // Save displayed result
    localStorage.setItem("wordRandomizer_result", result);
}
