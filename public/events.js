window.addEventListener("DOMContentLoaded", async event => {
    const res = await fetch("/kitten/image");
    const json = await res.json();
    console.log(json);
    const pick = document.querySelector(".cat-pic");
    pick.src = json.src;
});