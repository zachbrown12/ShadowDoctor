
document.addEventListener("DOMContentLoaded", () => {

    let doctorsList = document.querySelector('.doctors')

    fetchDoctors()
    //listing doctors API
    function fetchDoctors() {
      fetch(`http://localhost:3000/doctors`) 
      .then(function(response){
        return response.json();
      })
      .then(function(doctors) {
        renderDoctors(doctors)
      })
    }


    function renderDoctors(doctors){
        doctorsList.innerHTML = ''
        for (let doctor of doctors) {
            // doctor name, doctor city, doctor practice, button
            let docName = document.createElement('h2')
            docName.innerText = doctor.name
            
            let docCity = document.createElement('p')
            docCity.innerText = `${doctor.city}, ${doctor.state}`

            let docPrac = document.createElement('p')
            docPrac.innerText = doctor.practice

            let docNum = document.createElement('p')
            docNum.innerText = doctor.phone_number

            let form = document.createElement('p')
            form.innerHTML = `<form action="" method="get" class="form-example">
            <div class="form-example">
              <label for="name">Please choose enter a date: </label>
              <input type="date" date="date" id="date" required>
              <label for="name">Please enter shadow duration: </label>
              <input type="text" length="length" id="length" required>
            </div>
            `

            let btn = document.createElement('button')
            btn.setAttribute('class', 'schedule-btn')
            btn.setAttribute('id', doctor.id)
            btn.innerText = "Schedule"
            //btn.addEventListener('click', (e) => {
            //    console.log(e.target.dataset);
            //    likes(e)
            //  })
            
              let divCard = document.createElement('div')
              divCard.setAttribute('class', 'docCard')
              divCard.append(docName, docCity, docPrac, docNum, form, btn)
              doctorsList.append(divCard)
              
            
            // event listener for Schedule Button
            btn.addEventListener('click', (e) => {
                console.log(e.target)
            })
            }
        }
})
