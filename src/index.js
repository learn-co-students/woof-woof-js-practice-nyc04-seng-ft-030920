
let dogBar = document.querySelector("#dog-bar")
let dogInfo = document.querySelector("#dog-info")
let dogFilterButton = document.querySelector("#good-dog-filter")
let dogFilter = false
let dogFilterMsg = {
    "Filter good dogs: OFF": "Filter good dogs: ON",
    "Filter good dogs: ON": "Filter good dogs: OFF"
}
let goodDogBadDog = {
    true: "Good Dog!",
    false: "Bad Dog!",
}
let pupsObject = {}

dogFilterButton.addEventListener("click", (evt) => {
    evt.preventDefault
    dogFilter = !dogFilter
    dogFilterButton.innerText = dogFilterMsg[dogFilterButton.innerText]
    filterPups()
})

function filterPups() {
    resetChildren(dogBar)
    if (dogFilter) {
        for (const pup in pupsObject) {if (pupsObject[pup].isGoodDog) createDog(pupsObject[pup])}
    } else {
        for (const pup in pupsObject) {createDog(pupsObject[pup])}
    }
}

fetch('http://localhost:3000/pups')
    .then(r => r.json())
    .then((pupArray) => {
        pupArray.forEach((pup) => {
            pupsObject[pup.id] = pup;
            createDog(pup)
        }
    )});

function createDog(pup) {
    let pupSpan = document.createElement("span")
    pupSpan.innerText = pup.name;
    dogBar.append(pupSpan)
    
    pupSpan.addEventListener("click", () => {
        resetChildren(dogInfo)
        createDogInfo(pup)
    })   
}

function createDogInfo(pup) {
    let pupHead = document.createElement("h2");
    pupHead.innerText = pup.name;
    let pupImg = document.createElement("img")
    pupImg.src = pup.image;
    let pupStatus = document.createElement("button")
    pupStatus.innerText = goodDogBadDog[pup.isGoodDog]
    dogInfo.append(pupImg, pupHead, pupStatus)
    
    
    pupStatus.addEventListener("click", () => {
        fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({isGoodDog: !pup.isGoodDog})
        })
            .then(r => r.json())
            .then((updatedPup) => {
                pupsObject[pup.id].isGoodDog = updatedPup.isGoodDog
                pupStatus.innerText = goodDogBadDog[updatedPup.isGoodDog]
                if (dogFilter) {filterPups()}
            })
    })
}

function resetChildren(element) {
    let child = element.lastElementChild
    while (child) {
        element.removeChild(child);
        child = element.lastChild
    }
}