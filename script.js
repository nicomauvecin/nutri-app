const foods = {
    carbohydrates: [
        { name: "Yogur descremado", requiredAmount: 200, unit: "ml", consumed: 0, increment: 50 },
        { name: "Leche descremada", requiredAmount: 200, unit: "ml", consumed: 0, increment: 50 },
        { name: "Granola o quínoa pop", requiredAmount: 50, unit: "g", consumed: 0, increment: 50 },
        { name: "Pan integral", requiredAmount: 4, unit: "rebanadas", consumed: 0, increment: 1 },
        { name: "Arroz o fideos o polenta o legumbres en crudo", requiredAmount: 140, unit: "g", consumed: 0, increment: 50 },
        { name: "Papa o batata (cocido)", requiredAmount: 300, unit: "g", consumed: 0, increment: 50 },
        { name: "Membrillo o dulce de batata (solo post entreno)", requiredAmount: 80, unit: "g", consumed: 0, increment: 50 },
        { name: "Frutas (total al día)", requiredAmount: 750, unit: "g", consumed: 0, increment: 50 },
        { name: "Miel", requiredAmount: 1, unit: "cda", consumed: 0, increment: 1 }
    ],
    proteins: [
        { name: "Huevos enteros", requiredAmount: 4, unit: "unidades", consumed: 0, increment: 1 },
        { name: "Carne magra", requiredAmount: 400, unit: "g", consumed: 0, increment: 50 },
        { name: "Jamón cocido", requiredAmount: 2, unit: "fetas", consumed: 0, increment: 1 },
        { name: "Queso untable light o descremado", requiredAmount: 2, unit: "cdas", consumed: 0, increment: 1 },
        { name: "Queso cuartirolo magro o Port Salut light", requiredAmount: 50, unit: "g", consumed: 0, increment: 50 }
    ],
    fats: [
        { name: "Aceite de oliva extra virgen", requiredAmount: 2, unit: "cdas", consumed: 0, increment: 1 },
        { name: "Aceitunas (como sustituto de aceite)", requiredAmount: 8, unit: "unidades", consumed: 0, increment: 1 },
        { name: "Palta (como sustituto de aceite)", requiredAmount: 3, unit: "cdas", consumed: 0, increment: 1 },
        { name: "Mantequilla de maní", requiredAmount: 1, unit: "cda", consumed: 0, increment: 1 }
    ],
    water: [
        { name: "Agua", requiredAmount: 2000, unit: "ml", consumed: 0, increment: 500 }
    ],
    supplements: [
        { name: "Creatina", requiredAmount: 1, unit: "cda", consumed: 0, increment: 1 }
    ]
};

// Crear lista de alimentos con campos para cantidad consumida
function createChecklist() {
    for (const category in foods) {
        const list = document.getElementById(category);
        foods[category].forEach((item, index) => {
            const listItem = document.createElement('li');
            
            // Checkbox de completado
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `${category}-${index}`;
            checkbox.disabled = true;  // Desactivado, se marcará automáticamente
            checkbox.checked = item.consumed >= item.requiredAmount;
            
            // Nombre del alimento con la cantidad requerida
            const label = document.createElement('span');
            label.textContent = `${item.name} (Requerido: ${item.requiredAmount}${item.unit})`;
            
            // Botón para restar cantidad
            const subtractButton = document.createElement('button');
            subtractButton.textContent = "-";
            subtractButton.addEventListener('click', () => {
                item.consumed = Math.max(0, item.consumed - item.increment);
                updateUI(item, input, checkbox);
                saveProgress();
            });
            
            // Input para mostrar cantidad consumida
            const input = document.createElement('input');
            input.type = 'number';
            input.readOnly = true;
            input.value = item.consumed;
            
            // Botón para sumar cantidad
            const addButton = document.createElement('button');
            addButton.textContent = "+";
            addButton.addEventListener('click', () => {
                item.consumed += item.increment;
                updateUI(item, input, checkbox);
                saveProgress();
            });
            
            // Agregar elementos al item de la lista
            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            listItem.appendChild(subtractButton);
            listItem.appendChild(input);
            listItem.appendChild(addButton);
            list.appendChild(listItem);
        });
    }
}

// Actualizar el estado de los elementos en la interfaz de usuario
function updateUI(item, input, checkbox) {
    input.value = item.consumed;
    checkbox.checked = item.consumed >= item.requiredAmount;
}

// Mostrar la fecha actual en el subtítulo
function displayDate() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById("dateSubtitle").textContent = `Fecha: ${formattedDate}`;
}

// Guardar progreso en Local Storage
function saveProgress() {
    localStorage.setItem('foodChecklist', JSON.stringify(foods));
}

// Cargar progreso desde Local Storage
function loadProgress() {
    const savedData = localStorage.getItem('foodChecklist');
    if (savedData) {
        Object.assign(foods, JSON.parse(savedData));
    }
}

// Limpiar la checklist y borrar el progreso guardado
function resetChecklist() {
    for (const category in foods) {
        foods[category].forEach(item => item.consumed = 0);
    }
    saveProgress();
    location.reload(); // Recargar la página para resetear la vista
}

// Inicializar la aplicación
loadProgress();
displayDate();
createChecklist();
document.getElementById("resetButton").addEventListener("click", resetChecklist);