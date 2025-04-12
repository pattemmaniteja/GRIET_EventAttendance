document.getElementById("eventForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    // Show success message before flipping
    const successMsg = document.getElementById("successMsg");
    successMsg.innerHTML = `
        <div class="checkmark">
            <div class="checkmark-circle"></div>
            <div class="checkmark-stem"></div>
            <div class="checkmark-kick"></div>
          </div>
          <p style="color: #ffffff; font-size: 20px;">Event Added</p>
    `;
  
    // Flip the card
    document.getElementById("formCard").classList.add("flipped");
  
    // Optional: move the footer if needed
    // document.getElementsByTagName("footer")[0].style.position = "fixed";
  });
  