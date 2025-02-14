// Simple JS database to store the image data
const imageDatabase = [ //oldest to newest
    {
        name: '"bedroom"',
        date: "January 30th 2023",
        description: "",
        src: "img/gallery/bedroom.png"
    },
    {
        name: '"poke floats"',
        date: "June 22nd 2024",
        description: "Based on a skybox from smash melee. \n I really like how the sun turned out, the rest of it is mostly unfinished",
        src: "img/gallery/Poke Floats v3.png"
    },
    {
        name: '"I don\'t know where I\'m going"',
        date: "June 23nd 2024",
        description: "",
        src: "img/gallery/dont know where im going v1.png"
    },
    {
        name: '"mongering"',
        date: "July 11th 2024",
        description: "I drew over the cover art for \"fishmonger\" by underscores. (great album btw) :3",
        src: "img/gallery/mongering.png"
    },
    {
        name: '"wii fishing"',
        date: "August 5th 2024",
        description: "I like the fishing minigame from wii play. Its missing a tree because I got bored of working on this.",
        src: "img/gallery/wii fishing 1.png"
    },
    {
        name: '"do you still know where you\'re going?"',
        date: "November 19th 2024",
        description: "First attempt at making art in blender. I made this while relearning the program. The capsule is meant to resemble a player collider from unity. I took plenty of reference photo. The environment is very basic.",
        src: "img/gallery/do you still know where you_re going (version 1).png"
    },
    {
        name: '"a heart with no deeper meaning"',
        date: "January 17th 2025",
        description: "Made with blender. I was attempting to challenge myself to make a piece of art in roughly an hour. Not a huge fan of how inconsistent the lighting shader is.",
        src: "img/gallery/heart 2.png"
    },
    {
        name: '"shadow holding a katana"',
        date: "January 18th 2025",
        description: "Made in blender. Made over the course of a couple hours. Most of my time was spent rigging the shadow model from the ps2 game. The shaders are super basic and I wanted to do more. I used automatic freestyle outlines which I don't think turned out great. Anyway I thought this was cool. Shadow is cool.",
        src: "img/gallery/shadow 1.png"
    }
];

let currentIndex = 0; // Keeps track of the current image index

// Load the gallery dynamically
function loadGallery() {
    const gallery = document.getElementById('gallery');

    reversedImageDatabase = imageDatabase.reverse();
    
    gallery.innerHTML = ''; // Clear any existing images
    reversedImageDatabase.forEach((image, index) => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image');
        imageDiv.dataset.index = index; // Store index for navigation

        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.name;
        imgElement.loading = 'lazy';

        // Add event listener to open modal when image is clicked
        imgElement.addEventListener('click', () => openModal(index));

        imageDiv.appendChild(imgElement);
        gallery.appendChild(imageDiv);
    });
}

function updateModalBackground() {
    const modalImage = document.getElementById('modalImage');
    const modal = document.getElementById('imageModal');

    // Wait for the image to load
    modalImage.onload = function() {
        const imgWidth = this.naturalWidth;
        const imgHeight = this.naturalHeight;
        const modalWidth = modal.clientWidth;
        const modalHeight = modal.clientHeight;

        const containerWidth = modalWidth * 0.8;
        const containerHeight = modalHeight * 0.8;

        const widthRatio = containerWidth / imgWidth;
        const heightRatio = containerHeight / imgHeight;

        if (widthRatio < heightRatio) {
            // Image is constrained by width
            modalImage.style.width = '80%';
            modalImage.style.height = 'auto';
        } else {
            // Image is constrained by height
            modalImage.style.width = 'auto';
            modalImage.style.height = '80%';
        }
    };
}


// Open the modal and display the clicked image data
function openModal(index) {
    currentIndex = index;
    const image = imageDatabase[currentIndex];

    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalDate = document.getElementById('modalDate');
    const modalDescription = document.getElementById('modalDescription');

    modalImage.src = image.src;
    modalName.textContent = image.name;
    modalDate.textContent = image.date;
    modalDescription.textContent = image.description;

    modal.style.display = 'flex';

    updateModalBackground();
}

// Close the modal
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Change the image when navigating
function changeImage(step) {
    currentIndex += step;

    if (currentIndex < 0) {
        currentIndex = imageDatabase.length - 1; // Loop back to last image
    } else if (currentIndex >= imageDatabase.length) {
        currentIndex = 0; // Loop back to first image
    }

    openModal(currentIndex);
}

// Event listeners
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('prevImage').addEventListener('click', () => changeImage(-1));
document.getElementById('nextImage').addEventListener('click', () => changeImage(1));

// Close the modal when clicking outside of the modal content
document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('imageModal')) {
        closeModal();
    }
});



// Close the modal when the Escape key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    } else if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    }
});

// Load the gallery when the page is loaded
window.onload = function () {
    closeModal();
    loadGallery();

}
