let mode = "original";


// Load saved data when the page opens
document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("input");
    const result = document.getElementById("result");

    // Load saved mode
    const savedMode = localStorage.getItem("wordRandomizer_mode");

    if (savedMode !== null) {
        mode = savedMode;
    }

    // Load saved input
    const savedInput = localStorage.getItem("wordRandomizer_input");

    if (savedInput !== null) {
        input.value = savedInput;
    }

    // Load saved result
    const savedResult = localStorage.getItem("wordRandomizer_result");

    if (savedResult !== null) {
        result.innerHTML = savedResult;
    }

    // Save input whenever it changes
    input.addEventListener("input", function () {
        localStorage.setItem(
            "wordRandomizer_input",
            input.value
        );
    });

});



function setMode(newMode) {

    mode = newMode;

    localStorage.setItem(
        "wordRandomizer_mode",
        mode
    );

    randomize();
}



function randomize() {

    const input = document.getElementById("input");

    const text = input.value;

    // Save input immediately
    localStorage.setItem(
        "wordRandomizer_input",
        text
    );


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


    // Save result
    localStorage.setItem(
        "wordRandomizer_result",
        result
    );
}
