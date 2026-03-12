const token = "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";
const imageBox_el = document.getElementById("imageBox");
const promptText_el = document.getElementById("promptText");
const btn_gen_el = document.getElementById("btn-gen");
const btn_clear_el = document.getElementById("btn-clear");
const loadingMessage_el = document.getElementById("loadingMessage");
const btn_download_el = document.getElementById("btn-download");
const download_el = document .getElementById("download");

let promptText = "";

const modelLinks = ["https://api-inference.huggingface.co/models/Shakker-Labs/FLUX.1-dev-LoRA-add-details",
                      "https://api-inference.huggingface.co/models/glif/90s-anime-art", 
                      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
                      "https://api-inference.huggingface.co/models/Jovie/Midjourney"]


async function query(data) {
  const response = await fetch(
    
    modelLinks[1],
    // "https://api-inference.huggingface.co/models/glif/90s-anime-art",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

btn_clear_el.addEventListener("click", () => {
  promptText_el.value = "";
});

btn_gen_el.addEventListener("click", (event) => {
  promptText = promptText_el.value;

  if (promptText === "") {
    alert("Please Enter Description of the image you want to generate");
  } else {
    console.log(promptText);
    
    // Show the loading message and hide the image
    loadingMessage_el.style.display = "block";
    imageBox_el.style.display = "none";
    btn_download_el.style.display = "none";

    query({ inputs: promptText }).then((response) => {
      const imageUrl = URL.createObjectURL(response);
      imageBox_el.src = imageUrl;

      // Hide the loading message and show the image once it's ready
      loadingMessage_el.style.display = "none";
      imageBox_el.style.display = "block";
      // Update the download button
      download_el.style.display = "block";
      btn_download_el.style.display = "block";
      btn_download_el.href = imageUrl;
      btn_download_el.download = "generated_image.png";    
    }).catch(error => {
      loadingMessage_el.style.display = "none";
      alert("Failed to fetch the image. Please try again.");
      console.error("Error fetching image:", error);
    });
  }
});
console.log(btn_download_el)
btn_download_el.addEventListener("click", (event) => {
    // Optional: Log or perform any action before the download starts
    console.log("Download initiated for the generated image.");

    // You can also perform checks or modify the behavior here if needed.
    if (!btn_download_el.href) {
        event.preventDefault();
        alert("No image available for download.");
    }
});

