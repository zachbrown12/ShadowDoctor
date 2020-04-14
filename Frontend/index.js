document.addEventListener("DOMContentLoaded", () => {
    fetchStudents();
  
  });
  
  //event listeners
  
  const menuListener = () =>
    document.querySelector(".menu").addEventListener("click", e => {
      if (e.target.className === "button") {
        printOrder(e.target.dataset);
      }
    });
  
  const formListener = () => {
    const burgerForm = document.getElementById("custom-burger");
    burgerForm.addEventListener("submit", e => {
      e.preventDefault();
      const burgerObj = formToObject(burgerForm);
      const config = postConfig(burgerObj);
      postBurger(config);
      burgerForm.reset();
    });
  };
  
  //api calls
    function fetchStudents(){
        fetch("http://localhost:3000/students") 
            .then( response => response.json())
            .then(students => showStudents(students))
    }

    function showStudents(students){
        console.log(students)
    }
  
  const renderBurgers = burgers =>
    burgers.forEach(burger => {
      document.querySelector("#burger-menu").innerHTML += printBurger(burger);
    });
  
  const postBurger = config =>
    fetch(BURGER_URL, config)
      .then(r => r.json())
      .then(json => renderPost(json));
  
  const renderPost = burger => {
    printOrder(burger);
    document.querySelector("#burger-menu").innerHTML += printBurger(burger);
  };
  
  //template
  
  const printBurger = burger => `<div class="burger">
  <h3 class="burger_title">${burger.name}</h3>
    <img src="${burger.image}">
    <p class="burger_description">
      ${burger.description}
    </p>
    <button data-name=${burger.name} class="button">Add to Order</button>
  </div>`;
  
  const orderTemplate = burger =>
    `<li id="${burger.name}">${burger.name} burger  1`;
  
  const printOrder = burger => {
    const orders = document.querySelector(".order");
    const existingItem = document.getElementById(`${burger.name}`);
    if (existingItem === null) {
      orders.innerHTML += orderTemplate(burger);
    } else {
      const currentNum =
        parseInt(existingItem.innerText[existingItem.innerText.length - 1]) + 1;
  
      existingItem.innerText = `${existingItem.id} burger ${currentNum}`;
    }
  };
  
  //config
  
  const postConfig = obj => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  });
  
  //other
  const formToObject = form => {
    const [name, description, image] = [...form.elements]
      .filter(i => i.type != "submit")
      .map(i => i.value);
    return { name, description, image };
  };


