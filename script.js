document.addEventListener("DOMContentLoaded", () => {
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");
    const formulario = document.getElementById("contactoForm");
    const captchaCanvas = document.getElementById("captchaCanvas");
    const captchaInput = document.getElementById("captchaInput");
    const reloadCaptchaBtn = document.getElementById("reloadCaptcha");
    const captchaError = document.getElementById("captchaError");
  
    let captchaTextoActual = "";
  
    // 1. Función para generar un Captcha distorsionado en Canvas
    function generarCaptcha() {
      if (!captchaCanvas) return;
      const ctx = captchaCanvas.getContext("2d");
      const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
      
      // Generar 6 caracteres aleatorios
      captchaTextoActual = "";
      for (let i = 0; i < 6; i++) {
        captchaTextoActual += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
  
      // Fondo del Canvas
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, captchaCanvas.width, captchaCanvas.height);
  
      // Dibujar líneas de distorsión (ruido visual)
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.5)`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height);
        ctx.lineTo(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height);
        ctx.stroke();
      }
  
      // Dibujar el texto rotado y distorsionado
      ctx.font = "bold 24px Arial";
      for (let i = 0; i < captchaTextoActual.length; i++) {
        ctx.save();
        const x = 20 + i * 25;
        const y = 35 + (Math.random() * 8 - 4);
        const angle = (Math.random() * 0.4) - 0.2;
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = `rgb(${Math.floor(Math.random()*100)}, ${Math.floor(Math.random()*100)}, ${Math.floor(Math.random()*100)})`;
        ctx.fillText(captchaTextoActual[i], 0, 0);
        ctx.restore();
      }
    }
  
    // Inicializar Captcha y asignación del botón recargar
    generarCaptcha();
    if (reloadCaptchaBtn) {
      reloadCaptchaBtn.addEventListener("click", () => {
        generarCaptcha();
        captchaInput.value = "";
        if (captchaError) captchaError.textContent = "";
      });
    }
  
    // 2. Restricción en tiempo real: Solo letras en Nombre
    if (nombreInput) {
      nombreInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
      });
    }
  
    // 3. Restricción en tiempo real: Solo 10 dígitos en Teléfono
    if (telefonoInput) {
      telefonoInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
      });
    }
  
    // 4. Validación final al presionar "Enviar"
    if (formulario) {
      formulario.addEventListener("submit", (e) => {
        // Validar Teléfono
        if (telefonoInput.value.length !== 10) {
          e.preventDefault();
          alert("El número de teléfono debe tener exactamente 10 dígitos.");
          telefonoInput.focus();
          return;
        }
  
        // Validar Captcha
        if (captchaInput.value.trim() !== captchaTextoActual) {
          e.preventDefault();
          if (captchaError) {
            captchaError.textContent = "El código Captcha no coincide. Intenta de nuevo.";
            captchaError.style.color = "red";
          }
          captchaInput.focus();
          generarCaptcha();
          captchaInput.value = "";
        } else {
          if (captchaError) captchaError.textContent = "";
          alert("¡Formulario enviado con éxito!");
        }
      });
    }
  });