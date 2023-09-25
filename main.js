var url = "https://cityinfo.buchwaldshave34.dk/api";
var UserName = "UserName=UserMathiasB";
function getCities() {
    return fetch(url + "/City?" + UserName) // + "?includeRelations=false"
        .then(function (response) { return response.json(); })
        .then(function (response) {
        return response;
    });
}
function getCountries() {
    return fetch(url + "/Country?" + UserName)
        .then(function (response) { return response.json(); })
        .then(function (response) {
        return response;
    });
}
getCities().then(function (cities) {
    displayCities2(cities);
});
AddCityDropMenu();
function AddCityDropMenu() {
    //Creates a Dropmenu for the country
    var countrySelect = document.getElementById("cityDropMenu");
    getCountries().then(function (Countries) {
        Countries.forEach(function (country) {
            var option = document.createElement("option");
            option.value = "" + country.countryID;
            console.log(country);
            option.text = country.countryName;
            countrySelect.appendChild(option);
        });
    });
}
// Opgave 1 Display City
function displayCities(cities) {
    cities.forEach(function (city) {
        var button = document.createElement("input");
        button.type = "button";
        button.setAttribute("ID", "btn");
        button.value = city.name;
        var div = document.getElementById("div");
        div === null || div === void 0 ? void 0 : div.append(button);
    });
}
// Opgave 2 Display City with relation to country
function displayCities2(cities) {
    cities.forEach(function (city) {
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
        getCountries().then(function (Countries) {
            var i = 0;
            Countries.forEach(function (country) {
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
        updateBtn.addEventListener("click", function () { return updateCity(city); });
        //Creates deleteBtn
        var DeleteBtn = document.createElement("input");
        DeleteBtn.type = "button";
        DeleteBtn.value = "Delete";
        DeleteBtn.addEventListener("click", function () { return deleteCity(city); });
        // var countryInput = document.createElement('input');
        // countryInput.type = 'text';
        // countryInput.value = city.country.countryName
        citydiv.append(nameInput);
        citydiv.append(descriptionInput);
        citydiv.append(countrySelect);
        citydiv.append(updateBtn);
        citydiv.append(DeleteBtn);
        var div = document.getElementById("mainDiv");
        div === null || div === void 0 ? void 0 : div.append(citydiv);
    });
}
// Opgave 3 Add City
function createCity() {
    var addCity = {
        name: "",
        description: "",
        countryID: "3",
    };
    var cityName = document.getElementById("cityName");
    addCity.name = cityName.value;
    var cityDescription = document.getElementById("cityDescription");
    addCity.description = cityDescription.value;
    var selectedCountry = document.getElementById("cityDropMenu");
    addCity.countryID = selectedCountry.options[selectedCountry.selectedIndex].value;
    fetch(url + "/City?" + UserName, {
        method: "POST",
        body: JSON.stringify(addCity),
        headers: { "Content-Type": "application/json" },
    })
        .then(function (result) { return result.json(); })
        .then(function (jsonformat) { return console.log(jsonformat); });
    setTimeout(function () {
        window.location.reload();
    }, 200);
}
// Opgave 4 Update city
function updateCity(city) {
    var updateCity = {
        name: "",
        description: "",
        countryID: "3",
        cityId: "0"
    };
    var cityName = document.getElementById("nameInput" + city.cityId);
    updateCity.name = cityName.value;
    var cityDescription = document.getElementById("descriptionInput" + city.cityId);
    updateCity.description = cityDescription.value;
    var selectedCountry = document.getElementById("countrySelect" + city.cityId);
    updateCity.countryID = selectedCountry.options[selectedCountry.selectedIndex].value;
    updateCity.cityId = "" + city.cityId;
    fetch(url + "/City/" + city.cityId + "?" + UserName, {
        method: "PUT",
        body: JSON.stringify(updateCity),
        headers: { "Content-Type": "application/json" },
    })
        .then(function (result) { return result.json(); })
        .then(function (jsonformat) { return console.log(jsonformat); });
    setTimeout(function () {
        window.location.reload();
    }, 200);
}
// Opgave 5 Delete City
function deleteCity(city) {
    fetch(url + "/City/" + city.cityId + "?" + UserName, {
        method: "DELETE",
        body: JSON.stringify(updateCity),
        headers: { "Content-Type": "application/json" },
    });
    setTimeout(function () {
        window.location.reload();
    }, 200);
}
