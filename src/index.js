const dogBar = document.getElementById("dog-bar")
const dogButton = document.getElementById("good-dog-btn")

fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then((dogsArr) => {
        dogsArr.forEach((singleDog) => {
            createHTMLForDog(singleDog)
        })
    })

let createHTMLForDog = (dog) => {
    // create the outer box
    let dogSpan = document.createElement("span")
    
    // fill the contents
    // console.log(dog.name)
    dogSpan.innerHTML = `<span>${dog.name}</span>`
    // console.log(dogSpan)

    // append to the page
    dogBar.append(dogSpan)

    // find elements in the box
    const dogInfo = document.getElementById("dog-info")

    // add event listeners to the elements
    dogSpan.addEventListener("click", () => {
        fetch(`http://localhost:3000/pups/${dog.id}`)
            .then(resp => resp.json())
            .then((addDogInfoToPage) => {
                dogInfo.innerHTML = `<img src=${dog.image}><h2>${dog.name}</h2><button id="good-dog-btn">${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`
            })
    })
}

// dogButton.addEventListener("click", (evt) => {
//     evt.preventDefault()
//     let goodOrBad = evt.target.isGoodDog
//     console.log(goodOrBad)
//     // fetch(`http://localhost:3000/pups/${dog.id}`)

// })