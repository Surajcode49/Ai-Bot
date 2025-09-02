const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const textInput = document.querySelector(".text-input");
const sendTextButton = document.querySelector(".send-text");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good Morning Student , Teacher and Good Morning Suraj , how are you buddy");
  } else if (hour >= 12 && hour < 17) {
    speak("Good Afternoon Student , Teacher and Good Morning Suraj , how are you buddy.");
  } else {
    speak("Good Evening Student , Teacher and Good Morning Suraj , how are you buddy.");
  }
}

window.addEventListener("load", () => {
  speak("Initializing Cody Bot, Cody Bot is Ready...");
  wishMe();
});

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

btn.addEventListener("click", () => {
  content.textContent = "Listening....";
  recognition.start();
  console.log("Recognition started");
});

sendTextButton.addEventListener("click", () => {
  sendMessage();
});

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = textInput.value;
  if (message.trim() !== "") {
    content.textContent = message;
    takeCommand(message.toLowerCase());
    textInput.value = "";
  }
}

function takeCommand(message) {
  console.log("Received command: " + message);

  if (message.includes("hey") || message.includes("hello")) {
    speak("Hello Sir, How May I Help You?");
  } else if (
    message.includes("what is your name") ||
    message.includes("who are you") ||
    message.includes("what's your name")
  ) {
    speak("My name is Cody, I am an AI Bot");
  } else if (message.includes("how are you")) {
    speak("I'm just a bot, but I'm functioning perfectly. How about you?");
  } else if (message.includes("what can you do")) {
    speak("I can assist you with basic tasks like answering questions, telling jokes, and providing the time and date. What do you need help with?");
  } else if (message.includes("tell me a joke")) {
    speak("Why don’t programmers like nature? It has too many bugs!");
  } else if (message.includes("what is your favourite fruit")) {
    speak("My favourite fruit is mango.");
  } else if (message.includes("tell me about indian ocean")) {
    speak("The Indian Ocean is the third-largest ocean in the world, covering about 20% of Earth's water surface. It is surrounded by Asia to the north, Africa to the west, Australia to the east, and the Southern Ocean or Antarctica to the south.");
  } else if (message.includes("what is your favourite colour") || message.includes("what is artificial intelligence")) {
    speak("Black.");
  } else if (message.includes("what is the weather today")) {
    speak("I'm unable to fetch live weather updates. You can check your weather app for accurate details.");
  } else if (message.includes("can you sing a song")) {
    speak("I can’t sing, but I can recite lyrics! Twinkle twinkle little star, how I wonder what you are!");
  } else if (message.includes("what do you eat")) {
    speak("I'm an artificial intelligence. I don't eat food.");
  } else if (
    message.includes("who is your creator") ||
    message.includes("what is the name of your creator") ||
    message.includes("your creator name") ||
    message.includes("who build you")
  ) {
    speak("MR Suraj is my Creator.");
  } else if (
    message.includes("who is suraj")
  ) {
    speak("Suraj is from IIT KGP, he completed his B.Tech in Computer Science and Engineering. He is my boss.");
  } else if (
    message.includes("who is anushka")
  ) {
    speak("Ohh.. nice question She is the best friend of my boss Mr Suraj.");
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