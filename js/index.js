let rowData = document.getElementById("rowData");
let search = document.getElementById("searchSection");
let submitBtn = document.getElementById('submitBtn');


// loader
$(document).ready(() => {
  closeNav();
  $('.spinner').fadeOut(1000, ()=> {
    $('.loader').fadeOut(1000)
  })
})

// side-bar
$('.open-close-icon').click(() => {
  let offset = $('.side-bar').offset().left; 
  if (offset == 0) {
    closeNav();
  } else {
    openNav();
  }
});

function closeNav() {
  let innerWidth = $('.menu').innerWidth();
  $('.side-bar').animate({ left: -innerWidth }, 1000);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
 
}

function openNav() {
  $(".side-bar").animate({ left: 0 }, 1000);
  $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x");

  }
  

function displayMeals(data) {
    let meals = "";
    for (let i = 0; i < data.length; i++) {
      meals += `
        <div class="col-md-3">
          <div onclick="getDetails('${data[i].idMeal}')" class="meals position-relative overflow-hidden rounded-1">
            <img class="w-100" src="${data[i].strMealThumb}" alt="">
            <div class="layer position-absolute d-flex align-items-center text-black p-2">
              <h2>${data[i].strMeal}</h2>
            </div>
          </div>
        </div>`;
    }
    rowData.innerHTML = meals;
}
async function getmeals() {
  rowData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  response = await response.json();
  displayMeals(response.meals);

}
getmeals();


// Search
function displaySearchForm() {
  search.innerHTML = `
     <div class="row py-4">
      <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
        <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
    </div>`;
  rowData.innerHTML = "";
}

async function searchByName(term) {
  rowData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);

}

async function searchByFirstLetter(term) {
  rowData.innerHTML = "";
  term == "" ? (term = "a") : "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
}


// Categories
function displayCategories(data) {
  let meals = "";
  for (let i = 0; i < data.length; i++) {
    meals += `
      <div class="col-md-3">
        <div onclick="getCategoryMeals('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
          <div class="meal-layer position-absolute text-center text-black p-2">
            <h3>${data[i].strCategory}</h3>
            <p>${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
          </div>
        </div>
      </div>`;
  }
  rowData.innerHTML = meals;
}

async function getCategory() {
  rowData.innerHTML = "";
  search.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  response = await response.json();
  displayCategories(response.categories);

}

// Area
function displayArea(data) {
  let meals = "";
  for (let i = 0; i < data.length; i++) {
    meals += `
      <div class="col-md-3">
        <div onclick="getAreaMeals('${data[i].strArea}')" class="rounded-2 text-center cursor-pointer">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h2>${data[i].strArea}</h2>
        </div>
      </div>`;
  }
  rowData.innerHTML = meals;
}

async function getArea() {
  rowData.innerHTML = "";
  search.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  response = await response.json();
  displayArea(response.meals);
}

// Ingredients
function displayIngredients(data) {
  let meals = '';
  for (let i = 0; i < data.length; i++) {
    meals += `
      <div class="col-md-3">
        <div onclick="getIngredientMeals('${data[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h3>${data[i].strIngredient}</h3>
          <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
      </div>`;
  }
  rowData.innerHTML = meals;
}

async function getIngredient() {
  rowData.innerHTML = "";
  search.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  response = await response.json();
  displayIngredients(response.meals.slice(0, 20));

}

// Get meals by category
async function getCategoryMeals(catId) {

  rowData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`);
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));

}

// Get meals by area
async function getAreaMeals(areaId) {

  rowData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaId}`);
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
}

// Get meals by ingredient
async function getIngredientMeals(ingId) {
 
  rowData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingId}`);
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));

}

// Display meal details
function displayDetails(meal) {
  search.innerHTML = "";
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = meal.strTags?.split(",") || [];
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }
  let box = `
    <div class="col-md-4">
      <i id="goBackButton" class="fa-solid open-close-icon fa-x fa-2x"></i>
      <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
      <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
      <h2>Instructions</h2>
      <p>${meal.strInstructions}</p>
      <h3><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
      <h3><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
      <h3>Recipes:</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul>
      <h3>Tags:</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsStr}</ul>
      <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
      <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">YouTube</a>
    </div>`;
  rowData.innerHTML = box;
}

async function getDetails(mealId) {
  closeNav();
  rowData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  response = await response.json();
  displayDetails(response.meals[0]);
}

// FORM CONTROL
function displayContactForm(){
  rowData.innerHTML = `    <div class="contact-form d-flex justify-content-center align-items-center min-vh-100 m-auto">
      <div class="container w-75 text-center">
        <div class="row g-4 py-5">
          <div class="col-md-6">
            <input type="text" id="nameInput" onkeyup="validate()" class="form-control" placeholder="Enter you name">
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
              Special characters and numbers not allowed
          </div>
          </div>
          <div class="col-md-6">
            <input type="email" id="emailInput" onkeyup="validate()" class="form-control" placeholder="Enter you email">
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
              Email not valid *exemple@yyy.zzz          
            </div>
          </div>
          <div class="col-md-6">
            <input type="number" id="phoneInput" onkeyup="validate()" class="form-control" placeholder="Enter you phone number">
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid Phone Number         
            </div>
          </div>
          <div class="col-md-6">
            <input id="ageInput" onkeyup="validate()" type="number" class="form-control " placeholder="Enter Your Age"> 
               <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid Age        
            </div>
          </div>
          <div class="col-md-6">
            <input id="passInput" onkeyup="validate()" type="password" class="form-control " placeholder="Enter Your password"> 
               <div id="passAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*            </div>
          </div>
          <div class="col-md-6">
            <input id="repassInput" onkeyup="validate()" type="password" class="form-control " placeholder="Repassword"> 
               <div id="rePassAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid repassword       
            </div>
          </div>
        </div>
        <button id="submitBtn" disabled="true" class="btn btn-outline-danger px-2 mt-3">Submit</button>
      </div>
    </div>`
    submitBtn = document.getElementById("submitBtn");
    document.getElementById("nameInput").addEventListener("focus", () => {
      nameSelected = true;
    });
    document.getElementById("emailInput").addEventListener("focus", () => {
      emailSelected = true;
    });
    document.getElementById("phoneInput").addEventListener("focus", () => {
      phoneSelected = true;
    });
    document.getElementById("ageInput").addEventListener("focus", () => {
      ageSelected = true;
    });
    document.getElementById("passInput").addEventListener("focus", () => {
      passSelected = true;
    });
    document.getElementById("repassInput").addEventListener("focus", () => {
      rePassSelected = true;
    });

}
let nameSelected = false;
let emailSelected = false;
let phoneSelected = false;
let ageSelected = false;
let passSelected = false;
let rePassSelected = false;

function validate() {
  if (nameSelected) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailSelected) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (phoneSelected) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (ageSelected) {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("ageAlert").classList.replace("d-none", "d-block");
    }
  }
  if (passSelected) {
    if (passValidation()) {
      document
        .getElementById("passAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (rePassSelected) {
    if (rePassValidation()) {
      document
        .getElementById("rePassAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("rePassAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passValidation() &&
    rePassValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
// Regex Rules
function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}
function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}
function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}
function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}
function passValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passInput").value
  );
}
function rePassValidation() {
  return (
    document.getElementById("repassInput").value ==
    document.getElementById("passInput").value
  );
}
