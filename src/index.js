const dogBar = document.getElementById("dog-bar")
// const dogButton = document.getElementById("good-dog-btn")
const dogInfo = document.getElementById("dog-info")
const dogFilter = document.getElementById("good-dog-filter")


fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then((dogsArr) => {
        dogsArr.forEach((singleDog) => {
            createHTMLForDog(singleDog)
        })
        addDogInfoToPage(dogsArr[0])
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

    // add event listeners to the elements
    dogSpan.addEventListener("click", (evt) => {
        addDogInfoToPage(dog)
    })
}

let addDogInfoToPage = (dog) => {
   
    dogInfo.innerHTML = `<img src=${dog.image}><h2>${dog.name}</h2>`

    const dogButton = document.createElement("button")
    dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    // dogButton.dataset.id = dog.id
    // console.log(dogButton.dataset)
    
    dogInfo.append(dogButton)

    dogButton.addEventListener("click", (evt) => {
        evt.preventDefault()

        let newValue = ""

        if (dogButton.innerText.includes("Good")){
            evt.target.innerText = "Bad Dog"
            newValue = false
        } else {
            evt.target.innerText = "Good Dog"
            newValue = true
        }

        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "Application/json",
            },
            body: JSON.stringify({
                isGoodDog: evt.target.innerText
            })
        })
            .then(r => r.json())
            .then((updatedDog) => {
                dog.isGoodDog = updatedDog.isGoodDog
                dogButton.innerText = `${updatedDog.isGoodDog}`
            }) 
    })
}



// dogButton.addEventListener("click", (evt) => {
//     evt.preventDefault()
//     let goodOrBad = evt.target.isGoodDog
//     console.log(goodOrBad)
//     // fetch(`http://localhost:3000/pups/${dog.id}`)

// })