function addReg() {
    const input = document.getElementById("regInput");
    const regNo = input.value.trim();
    if (regNo === "") return;
  
    const regList = document.getElementById("regList");
  
    const regItem = document.createElement("div");
    regItem.className = "reg-item";
    regItem.innerHTML = `${regNo} <span onclick="removeReg(this)">❌</span>`;
  
    regList.appendChild(regItem);
    input.value = "";
  }
  
  function removeReg(element) {
    const regItem = element.parentElement;
    regItem.remove();
  }
  
  function submit() {
    const regs = Array.from(document.querySelectorAll('.reg-item'))
      .map(el => el.textContent.replace("❌", "").trim());
  
    if (regs.length === 0) {
      alert("No registrations to submit.");
      return;
    }
  
    // alert("Submitting: " + regs.join(", "));
    alert("Submitted");
  
    // Clear the registration list after submission
    const regList = document.getElementById("regList");
    regList.innerHTML = "";
  }
  