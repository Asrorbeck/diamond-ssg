/* ── Utility: toggle loading state on a button ── */
function setLoading(btn, loading) {
  if (!btn) return;
  btn.classList.toggle("btn--loading", loading);
  btn.disabled = loading;
}

/* ── APPLY FORM – Driver Application (iframe submit, fayl attachment ishlashi uchun) ── */
(function () {
  var applyForm = document.querySelector(".apply__form");
  var applyFrame = document.querySelector('iframe[name="apply-frame"]');
  var btn = document.getElementById("apply-submit-btn");

  applyForm.addEventListener("submit", function (e) {
    var termsAccepted = document.querySelector('input[name="terms"]').checked;
    if (!termsAccepted) {
      e.preventDefault();
      alert("You must agree to the terms and conditions.");
      return;
    }

    // Show loading — form submits normally to hidden iframe (NOT preventDefault)
    setLoading(btn, true);

    // Detect when iframe has loaded (= FormSubmit responded)
    function onFrameLoad() {
      applyFrame.removeEventListener("load", onFrameLoad);
      setLoading(btn, false);

      // Re-disable button until SMS consent re-checked
      var consent = document.getElementById("sms-consent");
      if (consent && !consent.checked) btn.disabled = true;

      applyForm.reset();
      var fileNameEl = document.getElementById("file-name");
      if (fileNameEl) fileNameEl.textContent = "";

      alert("Your information has been submitted!");
    }

    applyFrame.addEventListener("load", onFrameLoad);
  });
})();

/* ── CONTACT FORM – For Partners (AJAX, fayl yo'q) ── */
function sendContactForm() {
  var fullName    = document.getElementById("fullName").value;
  var company     = document.getElementById("company").value;
  var email       = document.getElementById("email").value;
  var jobTitle    = document.getElementById("jobTitle").value;
  var phoneNumber = document.getElementById("number").value;
  var message     = document.getElementById("message").value;

  if (!fullName || !company || !email || !jobTitle || !phoneNumber || !message) {
    alert("Please fill in all required fields.");
    return false;
  }

  var btn = document.getElementById("contact-submit-btn");
  setLoading(btn, true);

  fetch("https://formsubmit.co/ajax/Diamond_inc@yahoo.com", {
    method:  "POST",
    headers: {
      "Content-Type": "application/json",
      Accept:          "application/json",
    },
    body: JSON.stringify({
      _subject:    "Diamond Inc - For Partners (Contact)",
      _captcha:    "false",
      "Full Name": fullName,
      Company:     company,
      Email:       email,
      "Job Title": jobTitle,
      Phone:       phoneNumber,
      Message:     message,
    }),
  })
    .then((r) => r.json())
    .then(() => {
      alert("Your message has been sent!");
      document.querySelector(".contact__form").reset();
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    })
    .finally(() => {
      setLoading(btn, false);
    });

  return false;
}

document.querySelector(".contact__form").addEventListener("submit", function (e) {
  e.preventDefault();
  sendContactForm();
});

/* ── File name display ── */
function showFileName() {
  var input    = document.querySelector('input[name="cdl"]');
  var fileName = input.files[0] ? input.files[0].name : "No file selected";
  document.getElementById("file-name").textContent = fileName;
}

/* ── SMS consent → enable/disable submit ── */
function toggleSubmitBtn() {
  var checkbox  = document.getElementById("sms-consent");
  var submitBtn = document.getElementById("apply-submit-btn");
  if (submitBtn) {
    submitBtn.disabled = !checkbox.checked;
  }
}
