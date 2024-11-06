const foods = {
    carbohydrates: [
        { name: "Yogur descremado (1 vaso de 200cc)", requiredAmount: 200, unit: "ml", consumed: 0 },
        { name: "Leche descremada (1 taza o vaso de 200cc)", requiredAmount: 200, unit: "ml", consumed: 0 },
        { name: "Granola o quínoa pop (50g)", requiredAmount: 50, unit: "g", consumed: 0 },
        { name: "Pan integral (4 rebanadas)", requiredAmount: 4, unit: "rebanadas", consumed: 0 },
        { name: "Arroz o fideos o polenta o legumbres en crudo", requiredAmount: 140, unit: "g", consumed: 0 },
        { name: "Papa o batata (cocido)", requiredAmount: 300, unit: "g", consumed: 0 },
        { name: "Membrillo o dulce de batata (80g, solo post entreno)", requiredAmount: 80, unit: "g", consumed: 0 },
        { name: "Frutas (3 frutas de 250g cada una)", requiredAmount: 750, unit: "g", consumed: 0 },
        { name: "Miel (1 cda)", requiredAmount: 1, unit: "cda", consumed: 0 }
    ],
    proteins: [
        { name: "Huevos enteros (4 unidades)", requiredAmount: 4, unit: "unidades", consumed: 0 },
        { name: "Carne magra", requiredAmount: 400, unit: "g", consumed: 0 },
        { name: "Jamón cocido (2 fetas)", requiredAmount: 2, unit: "fetas", consumed: 0 },
        { name: "Queso untable light o descremado", requiredAmount: 2, unit: "cdas", consumed: 0 },
        { name: "Queso cuartirolo magro o Port Salut light (50g)", requiredAmount: 50, unit: "g", consumed: 0 }
    ],
    fats: [
        { name: "Aceite de oliva extra virgen (2 cdas)", requiredAmount: 2, unit: "cdas", consumed: 0 },
        { name: "Aceitunas (como sustituto de aceite)", requiredAmount: 8, unit: "unidades", consumed: 0 },
        { name: "Palta (como sustituto de aceite)", requiredAmount: 3, unit: "cdas", consumed: 0 },
        { name: "Mantequilla de maní (1 cda)", requiredAmount: 1, unit: "cda", consumed: 0 }
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
            
            // Nombre del alimento
            const label = document.createElement('span');
            label.textContent = `${item.name} (Requerido: ${item.requiredAmount}${item.unit})`;
            
            // Input para agregar cantidad consumida
            const input = document.createElement('input');
            input.type = 'number';
            input.placeholder = `Consumido (${item.unit})`;
            input.value = item.consumed;
            input.addEventListener('change', () => {
                const consumedAmount = parseFloat(input.value) || 0;
                item.consumed = consumedAmount;
                checkbox.checked = item.consumed >= item.requiredAmount;
                saveProgress();
            });
            
            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            listItem.appendChild(input);
            list.appendChild(listItem);
        });
    }
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
