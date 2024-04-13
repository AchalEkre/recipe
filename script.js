//Initial References
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = <h3>Input Field Cannot Be Empty</h3>;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strInstructions);
        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[strMeasure + count];
            count += 1;
            ingredients.push(${'measure'} ${'ingredient'}
          );
          }
        }
        console.log(ingredients);

        result.innerHTML = `
    <img src=${myMeal.strMealThumb}>
    <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea}</h4>
    </div>
    <div id="ingredient-con"></div>
    <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>
    `;
        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = <h3>Invalid Input</h3>;
      });
  }
});
let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  navbar.classList.remove('active');
};

const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
const resultCatefory = document.querySelector('.box-container');
let searchQuery = '';
const APP_ID = 'b4f0455e';
const APP_key = 'e42c126ef6f229e500dd22a660af5976';
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20;
  displayLoading();
  const response = await fetch(baseURL);
  const data = await response.json();

  countData(data.count);
  generateHTML(data.hits);
  // console.log(data);
  hideLoading();
}

async function searchByCategory(category) {
  searchQuery = category;
  const baseURL = https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20;
  displayLoading();
  const response = await fetch(baseURL);
  const data = await response.json();

  countData(data.count);
  generateHTML(data.hits);
  // console.log(data);
  window.scrollTo({
    top: document.getElementById('search').offsetTop,
    behavior: 'smooth',
  });
  hideLoading();
}

function countData(countResult) {
  if (countResult < 1) {
    notify2();
  } else {
    notify3();
  }
}

function generateHTML(results) {
  // container.classList.remove("initial");
  let generatedHTML = '';
  results.map((result) => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Food Type: ${result.recipe.dishType}</p>
        <p class="list-ingredient">Ingredients: ${
          result.recipe.ingredientLines.length > 10
            ? '<span>To Much Ingredients To Show! Click View Recipe Button To See Full Information</span>'
            : result.recipe.ingredientLines.map((indredient, indexIn) => {
                return `<li class="list-group-item">${indredient}
            </li>`;
              })
        }</p>
      </div>

    `;
  });
  var hasil = generatedHTML.replaceAll(',', '');
  searchResultDiv.innerHTML = hasil;
}

let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 3;

loadMoreBtn.onclick = () => {
  let boxes = [...document.querySelectorAll('.container .box-container .box')];
  for (var i = currentItem; i < currentItem + 3; i++) {
    boxes[i].style.display = 'inline-block';
  }
  currentItem += 3;

  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = 'none';
  }
};

// function Category(results) {
//   let CategoryH = "";
//   results.map((result) => {
//     if (result.recipe.cauisineType == "british") {
//       return result.recipe.label;
//     }
//     CategoryH += `
//       <div class="box">
//       </div>
//     `;
//   });
//   var categoriHasil = CategoryH.replaceAll(",", "");
//   resultCatefory.innerHTML = categoriHasil;
// }

function notify() {
  var newsletter = document.querySelector('.form-notify');
  newsletter.classList.toggle('active');
}
function notify2() {
  var newsletter = document.querySelector('.form-notify2');
  newsletter.classList.toggle('active');
}
function notify3() {
  var newsletter = document.querySelector('.form-notify3');
  newsletter.classList.toggle('active');
}
const loader = document.querySelector('#loading');
function displayLoading() {
  document.getElementById('body').style.opacity = '0.5';
  loader.classList.add('display');
  setTimeout(() => {
    loader.classList.remove('display');
  }, 8000);
}
function hideLoading() {
  loader.classList.remove('display');
  document.getElementById('body').style.opacity = '1';
}