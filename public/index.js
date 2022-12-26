document.getElementById("create-button").addEventListener("click", getQuery)

async function setRecipe(query) {
    let response = await fetch("/", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt:query })
    })
    let data = await response.json();

    return data.answer.trim();
}

async function getQuery() {
    let ingredients = document.getElementById("ingredients")
    let meal = document.getElementById("meal").value
    let style = document.getElementById("style").value
    let dish = document.getElementById("dish").value
    
    if (ingredients.value.length > 0) {
        document.getElementById("recipe").innerText = "loading... May take 10 seconds";

        let query = `Recipe of a ${dish} for ${meal} in a ${style} style that may involve these ingredients: ${ingredients.value}:`;
        ingredients.style.backgroundColor = "white";

        let answer = await setRecipe(query, "recipe");
        document.getElementById("recipe").innerText = answer;

    } else {
        ingredients.style.backgroundColor = "#FFB2B2"
    }
}


document.getElementById("copy-button").addEventListener("click", () => {
    navigator.clipboard.writeText(document.getElementById("recipe").innerText).then(function() {
        alert("Copied Recipe!")
      }, function(err) {
        alert("Failed to copy the recipe :(")
      });
});