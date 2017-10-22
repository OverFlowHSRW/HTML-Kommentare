var versuche = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
    var username = document.getElementById("user").value;
    var password = document.getElementById("pw").value;
    if (username == "dennis" && password == "hallo123") {
        alert("Login successfully");
        window.location = "index.html"; // Redirecting to other page.
        return false;
    } else {
        versuche--; // Decrementing by one.
        if (versuche > 0) {
            alert("You have left " + versuche + " attempt;");
            // Disabling fields after 3 attempts.
        } else {
            alert("Login fehlgeschlagen!");
        }
    }
    if (versuche == 0) {
        document.getElementById("user").disabled = true;
        document.getElementById("pw").disabled = true;
        document.getElementById("submit").disabled = true;
        return false;
    }
}