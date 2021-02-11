console.log("test");

window.addEventListener("DOMContentLoaded", async event => {
    // Phase 1: Fetches kitten picture upon first loadup
    updatePic();

    // Phase 2: New Pic Button
    let newCatButton = document.getElementById("new-pic");
    newCatButton.addEventListener("click", updatePic);
});

async function updatePic() {
    let loader = document.querySelector(".loader");
    loader.innerHTML = "Loading...";
    const res = await fetch("/kitten/image");
    if (res.ok) {
        const json = await res.json();
        const pick = document.querySelector(".cat-pic");
        pick.src = json.src;
    } else {
        const json = await res.json();
        let error = document.querySelector(".error");
        error.innerHTML = json.message;
    }
    loader.innerHTML = "";
}