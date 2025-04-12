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
  
  function goBack() {
    alert("Go back clicked!");
  }
  
  function submit() {
    const regs = Array.from(document.querySelectorAll('.reg-item'))
      .map(el => el.textContent.replace("❌", "").trim());
    alert("Submitting: " + regs.join(", "));
  }
  