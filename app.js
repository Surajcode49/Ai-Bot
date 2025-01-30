const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const textInput = document.querySelector(".text-input");
const sendTextButton = document.querySelector(".send-text");

// Speak function
function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;
  window.speechSynthesis.speak(text_speak);
}

// Greet based on time
function wishMe() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 12) {
    speak("Good Morning Suraj, respected teacher, and loving students. Good Morning Sir...");
  } else if (hour >= 12 && hour < 17) {
    speak("Good Afternoon Suraj, respected teacher, and loving students. Good Afternoon Sir...");
  } else {
    speak("Good Evening Suraj, respected teacher, and loving students. Good Evening Sir...");
  }
}

// Initialize Cody Bot
window.addEventListener("load", () => {
  speak("Initializing Cody Bot, Cody Bot is Ready...");
  wishMe();
});

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

if (!SpeechRecognition) {
  console.error("Speech Recognition API not supported in this browser.");
}

recognition.onstart = () => {
  console.log("Voice recognition activated. Try speaking into the microphone.");
};

recognition.onspeechend = () => {
  console.log("You were quiet for a while so voice recognition turned itself off.");
};

recognition.onerror = (event) => {
  console.error("Error occurred in recognition: " + event.error);
};

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  console.log("Recognized Text: " + transcript);
  takeCommand(transcript.toLowerCase());
};

// Button click to start recognition
btn.addEventListener("click", () => {
  content.textContent = "Listening....";
  recognition.start();
  console.log("Recognition started");
});

// Send text input
sendTextButton.addEventListener("click", sendMessage);
textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = textInput.value.trim();
  if (message !== "") {
    content.textContent = message;
    takeCommand(message.toLowerCase());
    textInput.value = "";
  }
}

// Weather API Integration
async function getWeather(city) {
  const apiKey = "6e08b1696521efc24a54c4e7de6fd3a7"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      speak(`The weather in ${city} is ${weather} with a temperature of ${temp} degrees Celsius.`);
    } else {
      speak("Sorry, I couldn't fetch the weather. Please check the city name.");
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    speak("Sorry, I couldn't fetch the weather. Please try again later.");
  }
}

// Open Applications (PC)
function openApplication(appName) {
  const apps = {
    notepad: "notepad.exe", // Opens Notepad
    calculator: "calc.exe", // Opens Calculator
    browser: "chrome.exe",  // Opens Chrome (replace with your preferred browser)
  };

  if (apps[appName]) {
    speak(`Opening ${appName}`);
    window.open(apps[appName], "_blank"); // Open the application
  } else {
    speak(`Sorry, I don't know how to open ${appName}.`);
  }
}

// Calculator
function calculate(expression) {
  try {
    const result = eval(expression); // Evaluate the mathematical expression
    speak(`The result is ${result}`);
  } catch (error) {
    console.error("Error in calculation:", error);
    speak("Sorry, I couldn't calculate that. Please check your input.");
  }
}

// Command Handling
function takeCommand(message) {
  console.log("Received command: " + message);
  if (message.includes("hey") || message.includes("hello")) {
    speak("Hello Sir, How May I Help You?");
  } else if (
    message.includes("what is your name") ||
    message.includes("who are you") ||
    message.includes("what's your name")
  ) {
    speak("My name is Cody, I am an AI Bot.");
  } else if (message.includes("how are you")) {
    speak("I'm just a bot, but I'm functioning perfectly. How about you?");
  } else if (message.includes("what can you do")) {
    speak(
      "I can assist you with basic tasks like answering questions, telling jokes, providing the time and date, fetching weather, opening applications, and performing calculations. What do you need help with?"
    );
  } else if (message.includes("tell me a joke")) {
    speak("Why don’t programmers like nature? It has too many bugs!");
  } else if (message.includes("where are you from")) {
    speak("I live in your device, powered by code and algorithms.");
  } else if (message.includes("can you help me with coding")) {
    speak(
      "Of course! Let me know what programming language or concept you're working on."
    );
  } else if (message.includes("what is ai") || message.includes("what is artificial intelligence")) {
    speak(
      "Artificial intelligence, or AI, is the simulation of human intelligence in machines that are programmed to think and learn."
    );
  } else if (message.includes("weather")) {
    const city = message.split("in ")[1] || "your location";
    getWeather(city);
  } else if (message.includes("open")) {
    const appName = message.split("open ")[1];
    openApplication(appName);
  } else if (message.includes("calculator")) {
    openApplication("calculator"); // Open the Calculator app
  } else if (message.includes("calculate")) {
    const expression = message.split("calculate ")[1]; // Extract the expression
    if (expression) {
      calculate(expression); // Pass the expression to the calculate function
    } else {
      speak("Please provide a valid mathematical expression to calculate.");
    }
  } else if (message.includes("can you sing a song")) {
    speak("I can’t sing, but I can recite lyrics! Twinkle twinkle little star, how I wonder what you are!");
  } else if (message.includes("what do you eat")) {
    speak("I'm an artificial intelligence. I don't eat food.");
  } else if (
    message.includes("who is your creator") ||
    message.includes("what is the name of your creator") ||
    message.includes("your creator name")
  ) {
    speak("Mr. Suraj is my Creator.");
  } else if (message.includes("date")) {
    const date = new Date().toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
    speak(`Today's date is ${date}`);
  } else if (message.includes("time")) {
    const time = new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    speak(`The current time is ${time}`);
  } else if (message.includes("thank you") || message.includes("thanks")) {
    speak("You're welcome! How else can I assist you?");
  } else if (message.includes("goodbye") || message.includes("bye")) {
    speak("Goodbye! Have a great day!");
  } else {
    speak("I am not sure how to respond to that.");
  }
}