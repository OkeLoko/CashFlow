document.addEventListener("DOMContentLoaded", function() {
    // Recuperar valores guardados
    function loadSavedValues() {
        document.getElementById("debo").value = localStorage.getItem("debo") || '';
        document.getElementById("tengo").value = localStorage.getItem("tengo") || '';
        document.getElementById("recibire").value = localStorage.getItem("recibire") || '';
        document.getElementById("me_deben").value = localStorage.getItem("me_deben") || '';
        document.getElementById("empece_con").value = localStorage.getItem("empece_con") || '';
        document.getElementById("terminare_con").value = localStorage.getItem("terminare_con") || '';
        document.getElementById("finalAmount").value = localStorage.getItem("finalAmount") || '';
        document.getElementById("incremento").value = localStorage.getItem("incremento") || '';
        document.getElementById("porcentaje").value = localStorage.getItem("porcentaje") || '';
        document.getElementById("dineroConDeudas").value = localStorage.getItem("dineroConDeudas") || '';
    }

    // Guardar valores calculados
    function saveValues() {
        localStorage.setItem("debo", document.getElementById("debo").value);
        localStorage.setItem("tengo", document.getElementById("tengo").value);
        localStorage.setItem("recibire", document.getElementById("recibire").value);
        localStorage.setItem("me_deben", document.getElementById("me_deben").value);
        localStorage.setItem("empece_con", document.getElementById("empece_con").value);
        localStorage.setItem("terminare_con", document.getElementById("terminare_con").value);
        localStorage.setItem("finalAmount", document.getElementById("finalAmount").value);
        localStorage.setItem("incremento", document.getElementById("incremento").value);
        localStorage.setItem("porcentaje", document.getElementById("porcentaje").value);
        localStorage.setItem("dineroConDeudas", document.getElementById("dineroConDeudas").value);
    }

    // Calcular valores financieros
    function calculateFinances() {
        let debo = parseFloat(eval(document.getElementById("debo").value) || 0);
        let tengo = parseFloat(eval(document.getElementById("tengo").value) || 0);
        let recibire = parseFloat(eval(document.getElementById("recibire").value) || 0);
        let meDeben = parseFloat(eval(document.getElementById("me_deben").value) || 0);

        let sobran = tengo - debo + recibire;
        let empeceCon = parseFloat(eval(document.getElementById("empece_con").value) || 0);
        let terminareCon = empeceCon + sobran;

        let cetes = (tengo * 0.135) / 365;
        let finalAmount = sobran + cetes;

        // Cálculo del incremento y porcentaje
        let incremento = finalAmount - sobran;
        
        // Cálculo del porcentaje de crecimiento respecto a "Empecé con"
        let porcentaje = ((finalAmount - empeceCon) / empeceCon) * 100;

        // Dinero que tendría si me pagaran todas las deudas
        let dineroConDeudas = sobran + meDeben;

        let dineroActual = tengo + (tengo * 0.135) / 365;

        // Actualizar campos en la interfaz
        document.getElementById("terminare_con").value = terminareCon.toFixed(2);
        document.getElementById("finalAmount").value = finalAmount.toFixed(2);
        document.getElementById("incremento").value = incremento.toFixed(2);
        document.getElementById("porcentaje").value = porcentaje.toFixed(2) + "%";
        document.getElementById("dineroConDeudas").value = dineroConDeudas.toFixed(2);
        document.getElementById("dineroActual").value = dineroActual.toFixed(2);

        // Guardar valores
        saveValues();
    }

    // Eventos
    document.getElementById("calculate").addEventListener("click", calculateFinances);

    // Cargar valores al inicio
    loadSavedValues();
});
