
document.addEventListener("DOMContentLoaded", () => {

    let doctorsList = document.querySelector('.doctors')
    let studentForm = document.querySelector('#student-form')
    let shadowsList = document.querySelector('.shadows')
    let pracSearch = document.querySelector('#practiceSearch')
    let stateSearch = document.querySelector('#stateSearch')



    fetchDoctors()
    fetchShadows()

    //search bar 
    pracSearch.addEventListener('keyup', function(e){
      if (e.target.id === 'practiceSearch') {
      //set up filter
      let input = document.querySelector('#practiceSearch')
      let filter = input.value.toUpperCase()
      let doctor = doctorsList.getElementsByClassName('docCard')

      //loop and filter
      for (i = 0; i < doctor.length; i++){
        let currentPrac = doctor[i].dataset.practice
        if (currentPrac) {
            if (currentPrac.toUpperCase().indexOf(filter) > -1) {
              doctor[i].style.display = "";
            }
            else {
              doctor[i].style.display = "none";
              }
            
          }
        }
      }
      })

      // state search
      stateSearch.addEventListener('keyup', function(e){
        if (e.target.id === 'stateSearch') {
          //set up filter
        let input = document.querySelector('#stateSearch')
        let filter = input.value.toUpperCase()
        let doctor = doctorsList.getElementsByClassName('docCard')
  
        //loop and filter
        for (i = 0; i < doctor.length; i++){
          let currentState = doctor[i].dataset.state
          if (currentState) {
              if (currentState.toUpperCase().indexOf(filter) > -1) {
                doctor[i].style.display = "";
              }
              else {
                doctor[i].style.display = "none";
                }
              
            }
          }
        }
        })
  

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

    function fetchStudents() {
        fetch(`http://localhost:3000/students`) 
        .then(function(response){
          return response.json();
        })
        .then(function(students) {
          renderStudents(students)
        })
      }

      function fetchShadows() {
        fetch(`http://localhost:3000/shadows`) 
        .then(function(response){
          return response.json();
        })
        .then(function(shadows) {
          renderShadows(shadows)
        })
      }

    function postStudent(studentForm){
        fetch (`http://localhost:3000/students`, {
        method: 'POST',
        headers: {'content-Type': 'application/json',
                    "accept": "application/json"
        },
        body: JSON.stringify({
            "name": studentForm.name.value,
            "school": studentForm.school.value
      })
    })
        .then(function(response){
          return response.json();
        })
        .then(function(student) {
          setStudent(student)
        })
  }
    

    function postShadow(event, id){
        return fetch (`http://localhost:3000/shadows`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  "accept": "application/json"
    },
        body: JSON.stringify({
            "student_id": id,
            "doctor_id": event.submit.dataset.id,
            "start_date": event.date.value,
            "length": event.length.value
      })
    })
    .then(function(response){
      return response.json();
    })
    .then(function(student) {
      fetchShadows()
    })
  }


  function deleteShadow(id){
    console.log(id)
    fetch(`http://localhost:3000/shadows/${id}`, {
    method: "DELETE"
  })
  .then(function(response){
    return response.json();
  })
  .then(function(student) {
   // fetchShadows()
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

            let docForm = document.createElement('p')
            docForm.innerHTML = `<form action="" method="get" class="form-example">
            <div class="form-example">
              <label for="name">Please enter a date: </label>
              <input type="date" date="date" id="date" required><br>
              <label for="name">Please enter shadow duration by day: </label>
              <input type="text" length="length" id="length" required><br>
              <input type="submit" data-id=${doctor.id} name="submit" value="Schedule Appointment" class="submit-appt"
            </div>
            </form>
            `

            let btn = document.createElement('button')
            btn.setAttribute('class', 'schedule-btn')
            btn.setAttribute('id', doctor.id)
            btn.innerText = "Schedule"

            //redirect button once clicked
            btn.addEventListener('click', (e) => {
               console.log(e.target.dataset);
               likes(e)
             })
            
              let divCard = document.createElement('div')
              divCard.setAttribute('class', 'docCard')
              divCard.dataset.id = doctor.id
              divCard.dataset.name = doctor.name
              divCard.dataset.practice = doctor.practice
              divCard.dataset.state = doctor.state
              divCard.append(docName, docCity, docPrac, docNum, docForm)
              doctorsList.append(divCard)
              
            
            // event listener for Schedule Button
            docForm.addEventListener('submit', (e) => {
                event.preventDefault()
                console.log(event.target)
                let currentStudent = document.querySelector('.currentStudent')
                let id = currentStudent.dataset.id
                console.log(id)        
                postShadow(event.target, id)
            })
            }
        }

    studentForm.addEventListener("submit", (e) => {
        event.preventDefault()
        postStudent(e.target)        
    })

    function setStudent(student){
        let currentStudent = document.createElement('div')
        currentStudent.className= 'currentStudent'
        currentStudent.dataset.id = student.id
        currentStudent.dataset.name = student.name
        currentStudent.innerText= student.name
        studentForm.append(currentStudent)
    }
        
    

    function renderShadows(shadows){
      shadowsList.innerHTML = ''
      for (let shadow of shadows) {

          // doctor name, doctor city, doctor practice, button
          let student = document.createElement('h2')
          student.innerText = `Student: ${shadow.student.name}`
          
          let doctor = document.createElement('p')
          doctor.innerText = `Doctor: ${shadow.doctor.name}`

          let date = document.createElement('p')
          date.innerText = `Date: ${shadow.start_date}`

          let length = document.createElement('p')
          length.innerText = `Length: ${shadow.length}`

          let deleteBtn = document.createElement('button')
          deleteBtn.innerText = "Cancel"
          deleteBtn.dataset.id = shadow.id
          deleteBtn.dataset.purpose = 'delete'
          
            let divCard = document.createElement('div')
            divCard.style.border = "#CCCCCC 1px solid"
            divCard.setAttribute('class', 'shadowCard', )
            divCard.append(student, doctor, date, length, deleteBtn)
            shadowsList.append(divCard)

            deleteBtn.addEventListener('click', (e) => {
                 if(event.target.dataset.purpose === 'delete'){
                     deleteShadow(event.target.dataset.id)
                     event.target.parentNode.remove()
                    } 
                  })
     }
    }
  
})
