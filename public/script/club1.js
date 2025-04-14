// document.getElementById("eventForm").addEventListener("submit", function(e) {
//     e.preventDefault();
  
//     // Show success message before flipping
//     const successMsg = document.getElementById("successMsg");
//     successMsg.innerHTML = `
//         <div class="checkmark">
//             <div class="checkmark-circle"></div>
//             <div class="checkmark-stem"></div>
//             <div class="checkmark-kick"></div>
//           </div>
//           <p style="color: #ffffff; font-size: 20px;">Event Added</p>
//     `;
  
//     // Flip the card
//     document.getElementById("formCard").classList.add("flipped");
  
//     // Optional: move the footer if needed
//     // document.getElementsByTagName("footer")[0].style.position = "fixed";
//   });
  


document.getElementById("eventForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const payload = {
    eventName: formData.get("eventName"),
    clubName: formData.get("clubName"),
    eventType: formData.get("eventType"),
    description: formData.get("description"),
  };

  try {
    const response = await fetch("/add-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.success) {
      // Add animation
      const successMsg = document.getElementById("successMsg");
      successMsg.innerHTML = `
        <div class="checkmark">
          <div class="checkmark-circle"></div>
          <div class="checkmark-stem"></div>
          <div class="checkmark-kick"></div>
        </div>
        <p style="color: #ffffff; font-size: 20px;">Event Added</p>
      `;
      document.getElementById("formCard").classList.add("flipped");
    } else {
      alert("Failed to add event. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Error occurred while submitting form.");
  }
});
