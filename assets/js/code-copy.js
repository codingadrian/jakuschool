document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("pre").forEach((block) => {
    
    // Create button
    const button = document.createElement("button");
    button.innerText = "Copy";
    button.className = "copy-btn";

    // Wrap pre in container
    const wrapper = document.createElement("div");
    wrapper.className = "code-wrapper";

    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);
    wrapper.appendChild(button);

    // Copy logic
    button.addEventListener("click", () => {
      const code = block.innerText;
      navigator.clipboard.writeText(code).then(() => {
        button.innerText = "Copied!";
        setTimeout(() => (button.innerText = "Copy"), 2000);
      });
    });
  });
});