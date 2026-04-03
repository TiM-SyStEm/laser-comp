let images = [];
let currentIndex = 0;

const currentImage = document.getElementById("currentImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");
const infoElement = document.getElementById("info");

async function loadImages() {
    currentImage.alt = "Загрузка...";
    infoElement.textContent = "Загрузка изображений...";

    loadedImages = [
        "imgs/interfer1.jpg",
        "imgs/interfer2.jpg",
        "imgs/interfer3.jpg",
        "imgs/interfer4.jpg",
        "imgs/interfer5.jpg",
        "imgs/interfer6.jpg",
        "imgs/interfer7.jpg"
    ];
    
    images = loadedImages;
    
    if (images.length > 0) {
        updateCarousel();
    } else {
        currentImage.alt = "Нет изображений";
        infoElement.textContent = "[ERROR] Изображения не найдены!";
    }
}
function checkImageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

function updateCarousel() {
    if (images.length === 0) return;
    currentImage.src = images[currentIndex];
    currentImage.alt = `Изображение ${currentIndex + 1}`;
    infoElement.textContent = `${currentIndex + 1} / ${images.length}`;
    updateDots();
}
function updateDots() {
    dotsContainer.innerHTML = "";
    
    for (let i = 0; i < images.length; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === currentIndex) {
            dot.classList.add("active");
        }
        dot.addEventListener("click", () => {
            currentIndex = i;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    }
}

function nextImage() {
    if (images.length === 0) return;
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

function prevImage() {
    if (images.length === 0) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        prevImage();
    } else if (e.key === "ArrowRight") {
        nextImage();
    }
});

loadImages();