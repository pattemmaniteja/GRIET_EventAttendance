// Get modal elements
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

// Function to open modal
function openModal(imgElement) {
modal.style.display = "block";
modalImg.src = imgElement.src;
captionText.innerHTML = imgElement.alt;
}

// Function to close modal
function closeModal() {
modal.style.display = "none";
}

// Close modal when clicking outside the image
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

