// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   document.getElementById("missionTarget").innerHTML = 
    `<h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">`
};

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } 
    else if (isNaN(testInput)) {
      return "Not a Number";
    }
    else if (!isNaN(testInput)) {
        return "Is a Number";
    }
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let form = document.querySelector("form");

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty"
    || validateInput(cargoLevel) === "Empty") {
        alert("All fields required!");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Please enter a valid name for Pilot and Co-pilot.")
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Please enter a number for Fuel Level and Cargo Mass.");
    } else {
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;
        
        if (fuelLevel < 10000) {
            list.style.visibility = "visible";
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
            let launchStatus = document.querySelector("#launchStatus");
            launchStatus.style.color = "rgb(199, 37, 78)";
        }
        if (cargoLevel > 10000) {
            list.style.visibility = "visible";
            document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
            let launchStatus = document.querySelector("#launchStatus");
            launchStatus.style.color = "rgb(199, 37, 78)";
        }
        if (cargoLevel > 10000 && fuelLevel < 10000) {
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
            let launchStatus = document.querySelector("#launchStatus");
            launchStatus.style.color = "rgb(199, 37, 78)";
        }
            
        if (cargoLevel <= 10000 && fuelLevel >= 10000) {
            document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
            list.style.visibility = "visible"
            let launchStatus = document.querySelector("#launchStatus");
            launchStatus.style.color = "rgb(65, 159, 106)";
            document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch";
        };
    };
};

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let random = Math.floor(Math.random() * planets.length);
    return planets[random];
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
