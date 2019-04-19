var user = getCookie('user');
    if (!user) {
        window.location.href = "login.html";
    }