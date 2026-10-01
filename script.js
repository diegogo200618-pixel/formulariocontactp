document.addEventListener("DOMContentLoaded", function () {
    const captchaText = document.getElementById("captcha-code");
    const captchaInput = document.getElementById("captcha-input");
    const btnRefresh = document.getElementById("btn-refresh");
    const form = document.getElementById("contactoForm");

    let generatedCaptcha = "";

    function generateCaptcha() {
        const characters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
        let captcha = "";
        for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        generatedCaptcha = captcha;
        captchaText.textContent = captcha;
    }

    btnRefresh.addEventListener("click", generateCaptcha);

    form.addEventListener("reset", function () {
        setTimeout(generateCaptcha, 10);
    });

    form.addEventListener("submit", function (e) {
        if (captchaInput.value.trim() !== generatedCaptcha) {
            e.preventDefault();
            alert("El código Captcha es incorrecto. Inténtalo de nuevo.");
            captchaInput.value = "";
            generateCaptcha();
        } else {
            alert("¡Mensaje enviado con éxito!");
        }
    });

    generateCaptcha();
});