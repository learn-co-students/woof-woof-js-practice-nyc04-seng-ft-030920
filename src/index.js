let dogBar = document.querySelector("div#dog-bar")
let dogInfo = document.querySelector("div#dog-info")


fetch("http://localhost:3000/pups").then(r => r.json())
    .then((pupsArray) => {
        pupsArray.forEach ((pup) => {
            makePupIntoHtml(pup)
        })
    })

function makePupIntoHtml(pup){
    let newSpan = document.createElement("span")
    newSpan.innerText = pup.name
    dogBar.append(newSpan)

    newSpan.addEventListener("click", () => {
        dogInfo.innerHTML = ""
        let imgTag = document.createElement("img")
        imgTag.src = pup.image

        let h2Tag = document.createElement("h2")
        h2Tag.innerText = pup.name

        let buttonTag = document.createElement("button")
        if (pup.isGoodDog) {buttonTag.innerText = "Good Dog!"}
        else {buttonTag.innerText = "Bad Dog!"}

        dogInfo.append(imgTag, h2Tag, buttonTag)

        buttonTag.addEventListener("click", (evt) => {
            fetch(`http://localhost:3000/pups/${pup.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json", Accept: "application/json"},
                body: JSON.stringify({
                    isGoodDog: !pup.isGoodDog
                })
            }).then(r => r.json())
            .then((updatedPup) => {
                pup.isGoodDog = updatedPup.isGoodDog
                if (updatedPup.isGoodDog) {buttonTag.innerText = "Good Dog!"}
                else {buttonTag.innerText = "Bad Dog!"}
            })
        })
    })


}