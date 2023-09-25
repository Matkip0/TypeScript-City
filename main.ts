interface City {
  cityId: number;
  name: string;
  description: string;
  countryID: number;
  numberOfPointsOfInterest: number;
  country: country;
  cityLanguages: Array<cityLanguages>;
  pointsOfInterest: Array<pointsOfInterest>;
}

interface country {
  countryID: number;
  countryName: string;
}

interface pointsOfInterest {
  pointsOfInterestId: number;
  cityId: number;
  name: string;
  description: string;
}

interface cityLanguages {
  languageId: number;
  languageName: string;
}

let url = "https://cityinfo.buchwaldshave34.dk/api";
let UserName = "UserName=UserMathiasB";

function getCities(): Promise<Array<City>> {
  return fetch(url + "/City?" + UserName) // + "?includeRelations=false"
    .then((response) => response.json())
    .then((response) => {
      return response as Array<City>;
    });
}

function getCountries(): Promise<Array<country>> {
  return fetch(url + "/Country?" + UserName)
    .then((response) => response.json())
    .then((response) => {
      return response as Array<country>;
    });
}

getCities().then((cities) => {
  displayCities2(cities);
});

AddCityDropMenu();

function AddCityDropMenu() {
  //Creates a Dropmenu for the country
  var countrySelect = document.getElementById(
    "cityDropMenu"
  ) as HTMLSelectElement;
  getCountries().then((Countries) => {
    Countries.forEach((country) => {
      var option = document.createElement("option");
      option.value = "" + country.countryID;
      console.log(country);
      option.text = country.countryName;
      countrySelect.appendChild(option);
    });
  });
}

// Opgave 1 Display City
function displayCities(cities: Array<City>) {
  cities.forEach((city) => {
    var button = document.createElement("input");
    button.type = "button";
    button.setAttribute("ID", "btn");
    button.value = city.name;
    var div = document.getElementById("div");
    div?.append(button);
  });
}

// Opgave 2 Display City with relation to country
function displayCities2(cities: Array<City>) {
  cities.forEach((city) => {
    //Creates a div for the city
    var citydiv = document.createElement("div");
    citydiv.id = "" + city.cityId;

    //Creates a text input for city name
    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = city.name;
    nameInput.setAttribute("ID", "nameInput" + city.cityId);

    //Creates a text input for city description
    var descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.value = city.description;
    descriptionInput.setAttribute("ID", "descriptionInput" + city.cityId);

    //Creates a Dropmenu for the country
    var countrySelect = document.createElement("select");
    countrySelect.setAttribute("ID", "countrySelect" + city.cityId);
    getCountries().then((Countries) => {
      var i = 0;
      Countries.forEach((country) => {
        var option = document.createElement("option");
        option.value = "" + country.countryID;
        option.text = country.countryName;
        countrySelect.appendChild(option);

        if (country.countryID == city.country.countryID) {
          countrySelect.selectedIndex = i;
        }
        i++;
      });
    });

    //Creates updateBtn
    var updateBtn = document.createElement("input");
    updateBtn.type = "button";
    updateBtn.value = "Update";
    updateBtn.addEventListener("click", () => updateCity(city));

    //Creates deleteBtn
    var DeleteBtn = document.createElement("input");
    DeleteBtn.type = "button";
    DeleteBtn.value = "Delete";
    DeleteBtn.addEventListener("click", () => deleteCity(city));

    // var countryInput = document.createElement('input');
    // countryInput.type = 'text';
    // countryInput.value = city.country.countryName

    citydiv.append(nameInput);
    citydiv.append(descriptionInput);
    citydiv.append(countrySelect);
    citydiv.append(updateBtn);
    citydiv.append(DeleteBtn)

    var div = document.getElementById("mainDiv");
    div?.append(citydiv);
  });
}

// Opgave 3 Add City
function createCity() {
  var addCity = {
    name: "",
    description: "",
    countryID: "3",
  };

  var cityName = document.getElementById("cityName") as HTMLInputElement;
  addCity.name = cityName.value;

  var cityDescription = document.getElementById("cityDescription") as HTMLInputElement;
  addCity.description = cityDescription.value;

  var selectedCountry = document.getElementById("cityDropMenu") as HTMLSelectElement;
  addCity.countryID = selectedCountry.options[selectedCountry.selectedIndex].value;

  fetch(url + "/City?" + UserName, {
    method: "POST",
    body: JSON.stringify(addCity),
    headers: { "Content-Type": "application/json" },
  })
    .then((result) => result.json())
    .then((jsonformat) => console.log(jsonformat));

    setTimeout(function(){
      window.location.reload();
    }, 200)
}

// Opgave 4 Update city
function updateCity(city: City) {
  var updateCity = {
    name: "",
    description: "",
    countryID: "3",
    cityId: "0"
  };
  var cityName = document.getElementById("nameInput" + city.cityId) as HTMLInputElement;
  updateCity.name = cityName.value;

  var cityDescription = document.getElementById("descriptionInput" + city.cityId) as HTMLInputElement;
  updateCity.description = cityDescription.value;

  var selectedCountry = document.getElementById("countrySelect" + city.cityId) as HTMLSelectElement;
  updateCity.countryID = selectedCountry.options[selectedCountry.selectedIndex].value;

  updateCity.cityId = "" + city.cityId

  fetch(url + "/City/" + city.cityId + "?" + UserName, {
    method: "PUT",
    body: JSON.stringify(updateCity),
    headers: { "Content-Type": "application/json" },
  })
    .then((result) => result.json())
    .then((jsonformat) => console.log(jsonformat));
    setTimeout(function(){
      window.location.reload();
    }, 200)
}

// Opgave 5 Delete City
function deleteCity(city: City){
  fetch(url + "/City/" + city.cityId + "?" + UserName, {
    method: "DELETE",
    body: JSON.stringify(updateCity),
    headers: { "Content-Type": "application/json" },
  })
  setTimeout(function(){
    window.location.reload();
  }, 200)
}


