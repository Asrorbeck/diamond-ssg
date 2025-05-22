function sendTelegram() {
  // Get form values
  var fullName = document.getElementById("FirstName").value;
  var email = document.getElementById("EmailUser").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var driverType = document.querySelector(
    'input[name="driverType"]:checked'
  ).value;
  var experience = document.querySelector(
    'input[name="experience"]:checked'
  ).value;
  var termsAccepted = document.querySelector('input[name="terms"]').checked;
  var cdlFile = document.querySelector('input[name="cdl"]').files[0];

  if (!termsAccepted) {
    alert("You must agree to the terms and conditions.");
    return false;
  }

  var botToken = "7402397772:AAEO_RJOBySfSeRArInjU16Eluc9m6KyB2o";
  var chatIds = ["-1002156911481"]; // Correct group chat ID

  // Construct the message
  var message = `Full Name: ${fullName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nDriver Type: ${driverType}\nExperience: ${experience}\nTerms Accepted: ${
    termsAccepted ? "Yes" : "No"
  }`;

  // Telegram Bot API endpoint for sending messages
  var apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  // Send the text message
  chatIds.forEach((chatId) => {
    var data = {
      chat_id: chatId,
      text: message,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {});
  });

  // Send the CDL file as a document
  if (cdlFile) {
    var fileApiUrl = `https://api.telegram.org/bot${botToken}/sendDocument`;

    var formData = new FormData();
    formData.append("chat_id", chatIds[0]); // Send to the first chat ID
    formData.append("document", cdlFile);
    formData.append("caption", `CDL File of ${fullName}`);

    fetch(fileApiUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {});
  }

  // Show alert
  alert("Your information has been submitted!");

  // Clear the form
  document.querySelector(".apply__form").reset();

  // Prevent the form from submitting traditionally
  return false;
}

document.querySelector(".apply__form").addEventListener("submit", function (e) {
  e.preventDefault();
  sendTelegram();
});

function showFileName() {
  var input = document.querySelector('input[name="cdl"]');
  var fileName = input.files[0] ? input.files[0].name : "No file selected";
  document.getElementById("file-name").textContent = fileName;
}

// Function to send form data to Telegram
function sendContactData() {
  // Get form values
  var fullName = document.getElementById("fullName").value;
  var company = document.getElementById("company").value;
  var email = document.getElementById("email").value;
  var jobTitle = document.getElementById("jobTitle").value;
  var phoneNumber = document.getElementById("number").value;
  var message = document.getElementById("message").value;

  // Check if any required field is empty
  if (
    !fullName ||
    !company ||
    !email ||
    !jobTitle ||
    !phoneNumber ||
    !message
  ) {
    alert("Please fill in all required fields.");
    return false;
  }

  var botToken = "7402397772:AAEO_RJOBySfSeRArInjU16Eluc9m6KyB2o";
  var chatId = "-1002156911481"; // Group chat ID

  // Construct the message
  var textMessage = `New Contact Form Submission:
Full Name: ${fullName}
Company: ${company}
Email: ${email}
Job Title: ${jobTitle}
Phone Number: ${phoneNumber}
Message: ${message}`;

  // Telegram Bot API endpoint for sending messages
  var apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  // Construct the data to be sent
  var data = {
    chat_id: chatId,
    text: textMessage,
  };

  // Make a POST request to the Telegram Bot API
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Your message has been sent!");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });

  // Clear the form
  document.querySelector(".contact__form").reset();

  // Prevent the form from submitting traditionally
  return false;
}

// Add event listener to form submit
document
  .querySelector(".contact__form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    sendContactData();
  });
