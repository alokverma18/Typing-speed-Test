const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".wrapper .input-field");
let mistakeTag = document.querySelector(".mistake span");
timeTage = document.querySelector(".time span b");
let msg = document.querySelector("message");
wpmTag = document.querySelector(".wpm span");
cpmTag = document.querySelector(".cpm span");
tryAgain = document.querySelector(".try");
let timer;
let maxTime = 90;
let timeleft = maxTime;
let charIndex = 0;
let mistakes = 0;
let istyping = 0;
function randomParagraphs() {
  // We will get a random number and it will be less than the length of the paragraph
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  //getting random item from the paragraph which depends on the randindex,Splitting all characters of it
  //then we add the character in a span and add this span inside the paragraph
  typingText.innerHTML = ""; //hyde krmal bss bde erj3 3ayyet lal method tkun fadyi al html tag w erj3 3abya
  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];

  //check if the time is greater than 0 and number of chractres greater then length
  if (charIndex < characters.length - 1 && timeleft > 0) {
    if (!istyping) {
      timer = setInterval(initTimer, 1000);
      istyping = true;
    }
    if (typedChar == null) {
      charIndex--; //decrement charIndex
      //decrement the mistakes only if the class is incorrect
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
        //if th user typed character and shown character matched then
        //correct class else add the incorrect class and increment the mistakes
      }
      // if (mistakes == 0 && timeleft < maxTime) message.innerText = "You won";
      else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }

      charIndex++;
    }

    //increment charIndex either user typed correct or incorrect character
    characters.forEach((span) => span.classList.remove("active"));
    //remove active class from all spans so that the line wont still appear
    characters[charIndex].classList.add("active");
    //We add active for the the letter that we didn't write yet

    mistakeTag.innerText = mistakes;

    cpmTag.innerText = charIndex - mistakes; //this will not count the mistakes
  } else {
    inpField.value = ""; // so that the user will not be able to write anything the input will be null
    clearInterval(timer);
  }
}

function initTimer() {
  //if the timeLeft i greater than 0 then decrement the timeLeft else clear the timer
  if (timeleft > 0) {
    timeleft--;
    timeTage.innerText = timeleft;
  } else {
    // } else if (
    //   mistakes == 0 &&
    //   timeleft < maxTime &&
    //   characters[charIndex + 1] == null
    // ) {
    //   msg.textContent = "You won";
    // } else {
    clearInterval(timer);
  }
}
function resetGame() {
  //calling the method and reset all variables and elements to default
  randomParagraphs();
  inpField.value = "";
  clearInterval(timer);
  let timeleft = maxTime;
  let charIndex = 0;
  let mistakes = 0;
  let istyping = 0;
  timeTage.innerText = timeleft;
  mistakeTag.innerText = mistakes;

  cpmTag.innerText = 0;
}
randomParagraphs();
inpField.addEventListener("input", initTyping);
tryAgain.addEventListener("click", resetGame);
// Get the toggle button element

// Add event listener to the toggle button

const toggleBtn = document.getElementById("toggle-btn");

toggleBtn.addEventListener("click", function () {
  const body = document.body;
  const currentTheme = body.classList.contains("light") ? "light" : "dark";

  if (currentTheme === "light") {
    body.classList.remove("light");
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
  }
});
