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
        document.getElementById("incrementoDiario").value = localStorage.getItem("incrementoDiario") || '';
        
        document.getElementById("incremento2").value = localStorage.getItem("incremento2") || '';

        loadNotes();  // Cargar notas al inicio
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
        localStorage.setItem("incrementoDiario", document.getElementById("incrementoDiario").value);

        localStorage.setItem("incremento2", document.getElementById("incremento2").value);
    }

    // Función para evaluar y calcular expresiones en los campos de entrada
    function evaluateExpression(value) {
        try {
            return eval(value);  // Evalúa la expresión y devuelve el resultado
        } catch (e) {
            return 0;  // Si hay un error en la expresión, devolver 0
        }
    }

    // Calcular valores financieros
    function calculateFinances() {
        let debo = parseFloat(evaluateExpression(document.getElementById("debo").value)) || 0;
        let tengo = parseFloat(evaluateExpression(document.getElementById("tengo").value)) || 0;
        let recibire = parseFloat(evaluateExpression(document.getElementById("recibire").value)) || 0;
        let meDeben = parseFloat(evaluateExpression(document.getElementById("me_deben").value)) || 0;
        let empeceCon = parseFloat(evaluateExpression(document.getElementById("empece_con").value)) || 0;
        let gastos = parseFloat(evaluateExpression(document.getElementById("gastos").value)) || 0;
        let incrementoDiario = parseFloat(evaluateExpression(document.getElementById("incrementoDiario").value)) || 0;
        
        // Cálculo de terminareCon
        let terminareCon = tengo + recibire - debo;
        
        // Cálculo del incremento diario de CETES
        let startDate = new Date(document.getElementById("startDate").value);
        let today = new Date();
        let daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        let cetesDailyRate = 0.135 / 365;
        let finalAmount = tengo * Math.pow((1 + cetesDailyRate), daysElapsed);
        
        // Cálculo de Incremento Diario
        incrementoDiario = tengo * cetesDailyRate;

        // Cálculo del incremento y porcentaje
        let incremento = finalAmount - empeceCon;
        let porcentaje = ((finalAmount - empeceCon) / empeceCon) * 100;
        
        // Dinero con deudas y dinero después de gastos
        let dineroConDeudas = meDeben + terminareCon - gastos;
        let dineroActual = empeceCon + incremento;
        let dineroGastos = terminareCon - gastos;

        //Incremento de lo que Empece con lo que Terminare
        let incremento2 = terminareCon - empeceCon;   

        // Actualizar campos en la interfaz
        document.getElementById("terminare_con").value = terminareCon.toFixed(2);
        document.getElementById("dineroGastos").value = dineroGastos.toFixed(2);
        document.getElementById("finalAmount").value = finalAmount.toFixed(2);
        document.getElementById("incremento").value = incremento.toFixed(2);
        document.getElementById("incrementoDiario").value = incrementoDiario.toFixed(2);
        document.getElementById("porcentaje").value = porcentaje.toFixed(2) + "%";
        document.getElementById("dineroConDeudas").value = dineroConDeudas.toFixed(2);
        document.getElementById("dineroActual").value = dineroActual.toFixed(2);
        
        document.getElementById("incremento2").value = incremento2.toFixed(2);

        // Guardar valores
        saveValues();
    }
    

    // Funciones para gestionar las notas
    function saveNote() {
        let noteContent = document.getElementById("noteContent").value;
        if (noteContent) {
            let notes = JSON.parse(localStorage.getItem("notes")) || [];
            notes.push(noteContent);
            localStorage.setItem("notes", JSON.stringify(notes));
            document.getElementById("noteContent").value = '';  // Limpiar textarea
            loadNotes();  // Recargar lista de notas
        }
    }

    function loadNotes() {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        let notesList = document.getElementById("notesList");
        notesList.innerHTML = '';  // Limpiar lista actual
        notes.forEach((note, index) => {
            let li = document.createElement("li");
            li.textContent = note;

            // Añadir botón de eliminar con imagen de basurero
            let deleteButton = document.createElement("img");
            deleteButton.src = "https://cdn-icons-png.flaticon.com/512/1214/1214428.png";  // Imagen de basurero
            deleteButton.className = "trash-icon";
            deleteButton.addEventListener("click", function() {
                deleteNote(index);  // Llamar a la función para eliminar nota
            });

            li.appendChild(deleteButton);
            notesList.appendChild(li);
        });
    }

    function deleteNote(index) {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(index, 1);  // Eliminar la nota en la posición indicada
        localStorage.setItem("notes", JSON.stringify(notes));  // Guardar notas actualizadas
        loadNotes();  // Recargar lista de notas
    }

    // Eventos
    document.getElementById("calculate").addEventListener("click", calculateFinances);
    document.getElementById("saveNote").addEventListener("click", saveNote);

    // Cargar valores y notas al inicio
    loadSavedValues();
});
