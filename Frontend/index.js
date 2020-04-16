
document.addEventListener("DOMContentLoaded", () => {

    let doctorsList = document.querySelector('.doctors')
    let studentForm = document.querySelector('#student-form')
    let shadowsList = document.querySelector('.shadows')
    let searchBar = document.querySelector('#search-form')
    //search bar
    searchBar.addEventListener('keyup', function(e){
      const term = e.target.value.toLowerCase()
      const practice = list.getElementsByTagName('p')
      Array.from(practice).forEach(function(practice){
        const title =practice.firstElementChild.textContent
        if(title.toLowerCase().indexOf(term)!=-1){
          practice.style.display = 'block'
        } else{
          practice.style.display = 'none'
        }
      })
    })

    fetchDoctors()
    fetchShadows()
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
        
    
    //   // delete button 
    // let deleteBtn = document.createElement('p')
    // deleteBtn.innerText = "Cancel"

    //  //redirect button once clicked
    //  deletebtn.addEventListener('click', (e) => {
    //   if(event.target.dataset.purpose === 'delete'){
    //     let deletebtn = event.target
    //     deletebtn.parentNode.remove()
    //   }
    // })

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
          
            let divCard = document.createElement('div')
            divCard.style.border = "#CCCCCC 1px solid"
            divCard.setAttribute('class', 'shadowCard', )
            divCard.append(student, doctor, date, length)
            shadowsList.append(divCard)
     }
    }
  
})
