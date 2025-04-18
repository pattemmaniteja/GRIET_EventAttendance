// document.getElementById("permissionForm").addEventListener("submit", async function(e) {
//     e.preventDefault();
  
//     const form = e.target;
//     const formData = new FormData(form);
  
//     const payload = {
//         description: formData.get("description"),
//         eventFile: formData.get("eventFile"),
//     };
  
//     try {
//       const response = await fetch("/addscript", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//       });
  
//       const result = await response.json();
  
//       if (result.success) {
//         // Add animation
//         const successMsg = document.getElementById("successMsg");
//         successMsg.innerHTML = `
//           <div class="checkmark">
//             <div class="checkmark-circle"></div>
//             <div class="checkmark-stem"></div>
//             <div class="checkmark-kick"></div>
//           </div>
//           <p style="color: #ffffff; font-size: 20px;">Permission Added</p>
//         `;
//         document.getElementById("formCard").classList.add("flipped");
//       } else {
//         alert("Failed to add event. Please try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error occurred while submitting form.");
//     }
//   });
document.getElementById("permissionForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form); // this includes the file too!

  try {
    const response = await fetch("/addscript", {
      method: "POST",
      body: formData, // send it directly!
    });

    const result = await response.json();

    if (result.success) {
      const successMsg = document.getElementById("successMsg");
      successMsg.innerHTML = `
        <div class="checkmark">
          <div class="checkmark-circle"></div>
          <div class="checkmark-stem"></div>
          <div class="checkmark-kick"></div>
        </div>
        <p style="color: #ffffff; font-size: 20px;">Permission Added</p>
      `;
      document.getElementById("formCard").classList.add("flipped");
    } else {
      alert("Failed to add permission. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Error occurred while submitting form.");
  }
});
