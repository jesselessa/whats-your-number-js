//* Selects elements
let form = document.querySelector("#form");
let input = document.querySelector("#number");
let error = document.querySelector("span");
let reset = document.querySelector("#reset");

//* Hide error and reset button
error.style.display = "none";
reset.style.display = "none";

//* Create other variables
let randomNumber = Math.floor(Math.random() * 101);

let strokes = 0; // Number of strokes/moves (everytime a user makes a proposal)

let chosenNumber; // Number picked by user

//* Create a function to check if we have found the correct number
const check = (number) => {
  // Everytime we make a check, we create a div (instruction) and we had a class (less, more or correct)

  let instruction = document.createElement("div");

  if (number < randomNumber) {
    // It's more !
    instruction.textContent = `#${strokes} (${number}) C'est plus !`;
    instruction.className = "instruction more";
  } else if (number > randomNumber) {
    // It's less !
    instruction.textContent = ` #${strokes} (${number}) C'est moins !`;
    instruction.className = "instruction less";
  } else {
    // It's correct !
    instruction.textContent = `Bravo, vous avez trouvé le bon numéro (${number}) au ${
      strokes === 1 ? `${strokes} er` : `${strokes} ème`
    } essai !`;
    instruction.className = "instruction correct";
    // Disable button when number found
    input.disabled = true;
    // Display reset button
    reset.style.display = "inline";
    // Reset form
    reset.addEventListener("click", () => {
      location.reload(); // Refresh page
    });
  }

  // Add div to our HTML page
  document.querySelector("#instructions").prepend(instruction);
};

//* Check if user enters a number
input.addEventListener("keyup", () => {
  if (isNaN(input.value)) {
    error.style.display = "inline";
  } else {
    error.style.display = "none";
  }
});

//* Act when sending the form
form.addEventListener("submit", (e) => {
  // Prevent form default behaviour
  e.preventDefault();

  if (isNaN(input.value) || input.value == "") {
    input.style.border = "0.2rem solid red"; // Invalid entry
  } else {
    strokes++; // Calculate number of strokes
    input.style.border = "0.2rem solid grey"; // Valid entry
    chosenNumber = input.value; // Store number chosen by user
    input.value = ""; // Reset input

    check(chosenNumber); // Call our function that checks if chosen number is correct
  }
});

//* Add year to footer
const year = document.querySelector("footer .year");
year.textContent = `${new Date().getFullYear()}`;
