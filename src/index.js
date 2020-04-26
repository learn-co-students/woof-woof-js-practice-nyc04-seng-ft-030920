const allPupsURL = `http://localhost:3000/pups`
// const singlePupURL = `http://localhost:3000/pups/${pup.id}`

const dogInfo = document.getElementById('dog-info')

fetch(allPupsURL)
    .then(r => r.json())
    .then((pups) =>
        pups.forEach(pup => loadAllPups(pup))
    )

// challenge 1: load all the pup names into the dog bar
function loadAllPups(pup) {
    const dogBar = document.getElementById('dog-bar')
    const dogNameButton = document.createElement('span')
    dogNameButton.innerText = pup.name
    dogNameButton.dataset.id = pup.id
    dogNameButton.style.cursor = "pointer"
    dogBar.appendChild(dogNameButton)

    // challenge 2: when a user clicks on a dog's name, that pup's info should show up in the dog info section
    dogNameButton.addEventListener("click", onDogNameClick)
}

function singlePupsInfo(pup) {
    let dogImage = document.createElement("img")
    dogImage.src = pup.image

    let dogName = document.createElement("h2")
    dogName.innerText = pup.name

    let dogStatusButton = document.createElement("button")
    dogStatusButton.innerText = pup.isGoodDog? "Good Dog!" : "Bad Dog!"
    dogStatusButton.dataset.id = pup.id

    dogInfo.append(dogImage, dogName, dogStatusButton)

    toggleDogStatusButton(pup)
}

// find a way to only show one dog's info at a time
function onDogNameClick(event){
    getSingleDog(event.target.dataset.id)
      .then(singlePupsInfo)
}

function getSingleDog(id){
    return fetch(`http://localhost:3000/pups/${id}`)
      .then(r => r.json())
}

// challenge 4: toggle dog status button
function toggleDogStatusButton(pup) {
    const dogButton = dogInfo.querySelector('button')

    dogButton.addEventListener("click", (event) => {
        console.log(dogButton.innerText)
        pup.isGoodDog = !pup.isGoodDog
        dogButton.innerText = pup.isGoodDog? "Good Dog!" : "Bad Dog!"

        let newValue = pup.isGoodDog
        toggleDogStatusBackend(event.target.dataset.id, newValue)
    })
}

function toggleDogStatusBackend(id, newValue){
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: newValue
      })
    }
    return fetch(`http://localhost:3000/pups/${id}`, options)
      .then(r => r.json())
}
