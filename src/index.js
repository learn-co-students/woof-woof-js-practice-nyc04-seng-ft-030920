const allPupsURL = `http://localhost:3000/pups`
// const singlePupURL = `http://localhost:3000/pups/${pup.id}`

const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')

fetch(allPupsURL)
    .then(r => r.json())
    .then((pups) =>
        pups.forEach(pup => loadAllPups(pup))
    )

// challenge 1: load all the pup names into the dog bar
function loadAllPups(pup) {
    const dogNameButton = document.createElement('span')
    dogNameButton.innerText = pup.name
    dogNameButton.style.cursor = "pointer"
    dogBar.appendChild(dogNameButton)
    
    // challenge 2: when a user clicks on a dog's name, that pup's info should show up in the dog info section
    dogNameButton.addEventListener("click", (event) => {
        console.log(event.target)
        singlePupsInfo(pup)
    })

    toggleDogStatusButton(pup)
}

function singlePupsInfo(pup) {
    let dogImage = document.createElement("img")
    dogImage.src = pup.image

    let dogName = document.createElement("h2")
    dogName.innerText = pup.name

    let dogStatusButton = document.createElement("button")
    dogStatusButton.innerText = pup.isGoodDog? "Good Dog!" : "Bad Dog!"

    dogInfo.append(dogImage, dogName, dogStatusButton)
}

// challenge 4: toggle dog status button
function toggleDogStatusButton() {

}