document.addEventListener('DOMContentLoaded', function () {
const branchSections = {
    cse: 6,
    it: 2,
    csds: 2,
    aiml: 1 
};

window.updateSections = function () {
    const branch = document.getElementById("branchSelect").value;
    const sectionSelect = document.getElementById("sectionSelect");

    // Clear existing options
    sectionSelect.innerHTML = '<option value="">Section</option>';

    const numSections = branchSections[branch] || 0;

    for (let i = 0; i < numSections; i++) {
    const sectionLetter = String.fromCharCode(65 + i); // A, B, C...
    const option = document.createElement("option");
    option.value = sectionLetter.toLowerCase();
    option.text = sectionLetter;
    sectionSelect.appendChild(option);
    }
};
});
