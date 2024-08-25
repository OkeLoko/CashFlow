document.addEventListener("DOMContentLoaded", function() {
    // Recuperar valores guardados
    function loadSavedValues() {
        document.getElementById("debo").value = localStorage.getItem("debo") || '';
        document.getElementById("tengo").value = localStorage.getItem("tengo") || '';
        document.getElementById("recibire").value = localStorage.getItem("recibire") || '';
        document.getElementById("me_deben").value = localStorage.getItem("me_deben") || '';
        document.getElementById("empece_con").value = localStorage.getItem("empece_con") || '';
        document.getElementById("startDate").value = localStorage.getItem("startDate") || '';
        document.getElementById("terminare_con").value = localStorage.getItem("terminare_con") || '';
        document.getElementById("finalAmount").value = localStorage.getItem("finalAmount") || '';
        document.getElementById("incremento").value = localStorage.getItem("incremento") || '';
        document.getElementById("porcentaje").value = localStorage.getItem("porcentaje") || '';
        document.getElementById("dineroConDeudas").value = localStorage.getItem("dineroConDeudas") || '';
        document.getElementById("dineroActual").value = localStorage.getItem("dineroActual") || '';
        document.getElementById("gastos").value = localStorage.getItem("gastos") || '';
        document.getElementById("dineroGastos").value = localStorage.getItem("dineroGastos") || '';
    }

    // Guardar valores calculados
    function saveValues() {
        localStorage.setItem("debo", document.getElementById("debo").value);
        localStorage.setItem("tengo", document.getElementById("tengo").value);
        localStorage.setItem("recibire", document.getElementById("recibire").value);
        localStorage.setItem("me_deben", document.getElementById("me_deben").value);
        localStorage.setItem("empece_con", document.getElementById("empece_con").value);
        localStorage.setItem("startDate", document.getElementById("startDate").value);
        localStorage.setItem("terminare_con", document.getElementById("terminare_con").value);
        localStorage.setItem("finalAmount", document.getElementById("finalAmount").value);
        localStorage.setItem("incremento", document.getElementById("incremento").value);
        localStorage.setItem("porcentaje", document.getElementById("porcentaje").value);
        localStorage.setItem("dineroConDeudas", document.getElementById("dineroConDeudas").value);
        localStorage.setItem("dineroActual", document.getElementById("dineroActual").value);
        localStorage.setItem("gastos", document.getElementById("gastos").value);
        localStorage.setItem("dineroGastos", document.getElementById("dineroGastos").value);
    }

    // Calcular valores financieros
    function calculateFinances() {
        let debo = parseFloat(eval(document.getElementById("debo").value) || 0);
        let tengo = parseFloat(eval(document.getElementById("tengo").value) || 0);
        let recibire = parseFloat(eval(document.getElementById("recibire").value) || 0);
        let meDeben = parseFloat(eval(document.getElementById("me_deben").value) || 0);
        let empeceCon = parseFloat(eval(document.getElementById("empece_con").value) || 0);
        let gastos = parseFloat(eval(document.getElementById("gastos").value) || 0);
        let dineroGastos = parseFloat(eval(document.getElementById("dineroGastos").value) || 0);
        

        let sobran = tengo - debo + recibire;
        let terminareCon = sobran;

        let startDate = new Date(document.getElementById("startDate").value);
        let today = new Date();
        let daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

        let cetesDailyRate = 0.135 / 365;
        let finalAmount = sobran * Math.pow((1 + cetesDailyRate), daysElapsed);

        // Cálculo del incremento y porcentaje
        let incremento = finalAmount - sobran;

        let porcentaje = ((finalAmount - empeceCon) / empeceCon) * 100;

        // Dinero que tendría si me pagaran todas las deudas
        let dineroConDeudas = sobran + meDeben;

        let dineroActual = empeceCon + incremento;

        //Dinero Despues de Gastos
        dineroGastos = dineroActual - gastos;

        //16,859.97
        // Actualizar campos en la interfaz
        document.getElementById("terminare_con").value = terminareCon.toFixed(2);
        document.getElementById("dineroGastos").value = dineroGastos.toFixed(2);
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
