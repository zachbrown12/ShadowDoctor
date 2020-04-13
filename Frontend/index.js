document.addEventListener("DOMContentLoaded", () => {

fetchStudents()


function fetchStudents(){
    fetch("http://localhost:3000/students") 
        .then( response => response.json())
        .then(students => showStudents(students))
}

function showStudents(students){
    console.log(students)
}
})

