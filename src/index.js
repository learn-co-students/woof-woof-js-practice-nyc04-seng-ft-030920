let dogBar = document.getElementById('dog-bar')
let dogInfo = document.getElementById('dog-info')


fetch("http://localhost:3000/pups")
.then(r => r.json())
.then(dogResponse => {
dogResponse.forEach(element => {
    renderDog(element)

})
     

})


function renderDog(dog){
   let span = document.createElement("span")
   span.innerText = dog.name

   dogBar.append(span)


   span.addEventListener('click' , function(evt){

     
    let img = document.createElement('img')
    img.src = dog.image
    let header = document.createElement('h2')
    header.innerText = dog.name
    let button = document.createElement("button")
    button.classList.add("dog-status")

    if(dog.isGoodDog){
        button.innerText = "Good Dog!"
    }
    else {
        button.innerText = "Bad Dog!"
    }
    dogInfo.innerHTML = ""
    
    dogInfo.append(img , header , button)
    let buttonStatus = dogInfo.querySelector(".dog-status")

    console.log(buttonStatus)
    
    buttonStatus.addEventListener('click' , function(evt){
     console.log("hello")
     evt.preventDefault()
        fetch(`http://localhost:3000/pups/${dog.id}`, 
        
         {
            
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                 "Accept": "application/json"
             },
             body: JSON.stringify({
                isGoodDog: dog.isGoodDog ? false : true
                // likes: ++toy.likes
              })
             
                
    
            
              
    
        }).then(r => r.json())
        .then(dogUpdate => {
            console.log(dogUpdate)
           dog.isGoodDog = dogUpdate.isGoodDog
           dog.isGoodDog ? buttonStatus.innerText = "Good Dog!" : buttonStatus.innerText = "Bad Dog!"
    
       })
    
      })

   })


  

}