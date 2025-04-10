const eventBar = document.getElementById("eventBar");
const wrapper = document.querySelector(".event-bar-wrapper");
const scrollAmount = 255; // Width of one card + gap

let currentScroll = 0;

// Calculate max scroll dynamically
const getMaxScroll = () => {
  return eventBar.scrollWidth - wrapper.clientWidth;
};

document.querySelector(".scroll-btn.left").addEventListener("click", () => {
  currentScroll = Math.max(currentScroll - scrollAmount, 0);
  eventBar.style.transform = `translateX(-${currentScroll}px)`;
});

document.querySelector(".scroll-btn.right").addEventListener("click", () => {
  currentScroll = Math.min(currentScroll + scrollAmount, getMaxScroll());
  eventBar.style.transform = `translateX(-${currentScroll}px)`;
});