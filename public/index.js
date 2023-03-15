window.onload = async () => {
    initLoginForm();
};

function initLoginForm() {
    document.querySelector("#form_login").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const password = form.password.value;
        const resp = await fetch("/login", {
            method: "POST",
            headers: { "content-type": "application/json"},
            body: JSON.stringify({ username: username, password: password}),
        });

        if(resp.status === 200) {
            window.location = "/admin.html";
        }
    });
};

