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
    speak("Good Morning Children and Good Morning Sir...");
  } else if (hour >= 12 && hour < 17) {
    speak("Good Afternoon Children and good morning Sir...");
  } else {
    speak("Good Evening Sir...");
  }
}

window.addEventListener("load", () => {
  speak("Initializing  cody Bot , They Bot is Ready ..");
  wishMe();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Add debug statement to check if speech recognition is supported
if (!SpeechRecognition) {
  console.error("Speech Recognition API not supported in this browser.");
}

recognition.onstart = () => {
  console.log("Voice recognition activated. Try speaking into the microphone.");
};

recognition.onspeechend = () => {
  console.log(
    "You were quiet for a while so voice recognition turned itself off."
  );
};

recognition.onerror = (event) => {
  console.error("Error occurred in recognition: " + event.error);
};

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  console.log("Recognized Text: " + transcript); // Add debug statement to log recognized text
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  content.textContent = "Listening....";
  recognition.start();
  console.log("Recognition started"); // Add debug statement to log when recognition starts
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
    textInput.value = ""; // Clear the text input after sending the message
  }
}

function takeCommand(message) {
  console.log("Received command: " + message); // Add debug statement to log received commands
  if (message.includes("hey") || message.includes("hello")) {
    speak("Hello Sir, How May I Help You?");
  } else if (
    message.includes("what is your name") ||
    message.includes("who are you") ||
    message.includes("what's your name")
  ) {
    speak("My name is Codie, I am AI Bot .");
  } 
  




  else if (message.includes(" Type Question Here "))
  {
          speak("Type Answer here")
  }
  



  
  else if (
    message.includes("Who is you creator") ||
    message.includes("what is the name of your Creater") ||
    message.includes("your creator name")
  ) {
    speak(" Mr. Bikash sir is my Creator");
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    speak(date);
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    speak(time);
  }
  
   else if (message.includes("what do you eat")) {
    speak("  im a artificial  intelligence i dont want food  ");
  } else if (message.includes("thank you") || message.includes("thanks")) {
    speak("You're welcome! How else can I assist you?");
  } else if (message.includes("goodbye") || message.includes("bye")) {
    speak("Goodbye! Have a great day! ");
  } else {
    speak("I am not sure how to respond to that.");
  }
}
