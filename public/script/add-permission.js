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
    console.log(result.success);
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
