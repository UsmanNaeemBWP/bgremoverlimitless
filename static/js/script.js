let addCard = document.getElementById("addCard");
let displayCard = document.getElementById("displayCard");
let downloadCard = document.getElementById("downloadCard");
let fileInput = document.getElementById("fileInput");
let imageBefore = document.getElementById("display-img");
let startBtn = document.getElementById("startBtn");
let processingOverlay = document.getElementById("processingOverlay");
let uploadAgainBtn = document.getElementById("uploadAgainBtn");

const reader = new FileReader();

const activeScreen = (screen) => {
    addCard.classList.remove("active");
    displayCard.classList.remove("active");
    if (downloadCard) downloadCard.classList.remove("active");
    screen.classList.add("active");
};

// Initially show the add card
activeScreen(addCard);

fileInput.addEventListener("input", () => {
    const file = fileInput.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        imageBefore.src = reader.result;
    };
    activeScreen(displayCard);
});

// Show processing overlay when form is submitted
if (startBtn) {
    startBtn.addEventListener("click", () => {
        if (processingOverlay) {
            processingOverlay.style.display = "flex";
        }
    });
}

// If result image exists, show download card
if (downloadCard) {
    activeScreen(downloadCard);
}

// Add event listener for the Upload Again button
if (uploadAgainBtn) {
    uploadAgainBtn.addEventListener("click", () => {
        // Reset the file input
        fileInput.value = "";
        // Clear the display image
        imageBefore.src = "";
        // Show the add card again
        activeScreen(addCard);
    });
}