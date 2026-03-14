document.getElementById("signIn-btn").addEventListener("click", function () {

    const username = document.getElementById("username");
    const name = username.value;
    console.log(name);
    const password = document.getElementById("password");
    const pass = password.value;
    console.log(pass);
    // condition check:

    if (name === "admin" && pass === "admin123") {
        alert("Login Sucessful");
    }
    else {
        alert("Invalid Username or Password");
    }

})