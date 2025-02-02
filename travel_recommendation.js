// Función para mostrar los resultados en el popup
function displayResults(data, matchedTerms) {
    const resultsPopup = document.getElementById('resultsPopup');
    
    // Limpiar resultados anteriores
    resultsPopup.innerHTML = '';
    resultsPopup.style.display = 'block';

    // Crear y agregar el mensaje de agradecimiento al principio del popup
    const thankyouMessage = document.createElement('div');
    thankyouMessage.classList.add('thankyou-message');
    resultsPopup.appendChild(thankyouMessage);

    // Opciones para obtener la hora local
    const timeOptions = {
        'Sydney, Australia': { timeZone: 'Australia/Sydney', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        'Melbourne, Australia': { timeZone: 'Australia/Melbourne', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        'Tokyo, Japan': { timeZone: 'Asia/Tokyo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        'Kyoto, Japan': { timeZone: 'Asia/Tokyo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        'Rio de Janeiro, Brazil': { timeZone: 'America/Sao_Paulo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        'São Paulo, Brazil': { timeZone: 'America/Sao_Paulo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        'Angkor Wat, Cambodia': { timeZone: 'Asia/Phnom_Penh', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        'Taj Mahal, India': { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        'Cartagena, Colombia': { timeZone: 'America/Bogota', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        'Copacabana Beach, Brazil': { timeZone: 'America/Sao_Paulo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        'Bora Bora, French Polynesia': { timeZone: 'Pacific/Tahiti', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    };

    // Filtrar y mostrar resultados
    let resultCount = 0; // Contador de resultados

    for (const term of matchedTerms) {
        for (const item of data[term]) {
            if (term === 'countries') {
                for (const city of item.cities) {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    
                    const nameElement = document.createElement('h2');
                    nameElement.textContent = city.name;
                    resultItem.appendChild(nameElement);
                    
                    const descriptionElement = document.createElement('p');
                    descriptionElement.textContent = city.description || '';
                    resultItem.appendChild(descriptionElement);

                    if (city.imageUrl) {
                        const imageElement = document.createElement('img');
                        imageElement.src = city.imageUrl;
                        resultItem.appendChild(imageElement);
                    }

                    const visitText = document.createElement('div');
                    visitText.textContent = 'Visit Us!';
                    visitText.classList.add('button-popup');
                    resultItem.appendChild(visitText);

                    // Obtener la hora actual de la ciudad
                    const currentTime = new Date().toLocaleTimeString('en-US', timeOptions[city.name]);
                    if (currentTime) {
                        const dateTimeElement = document.createElement('p');
                        dateTimeElement.textContent = `Current time: ${currentTime}`;
                        const timeZone = timeOptions[city.name].timeZone;
                        const zoneElement = document.createElement('p');
                        zoneElement.textContent = `Time Zone: ${timeZone}`;
                        resultItem.appendChild(dateTimeElement);
                        resultItem.appendChild(zoneElement);
                    }

                    resultsPopup.appendChild(resultItem);
                    resultCount++;
                }
            } else {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                
                const nameElement = document.createElement('h2');
                nameElement.textContent = item.name;
                resultItem.appendChild(nameElement);
                
                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = item.description || '';
                resultItem.appendChild(descriptionElement);

                if (item.imageUrl) {
                    const imageElement = document.createElement('img');
                    imageElement.src = item.imageUrl;
                    resultItem.appendChild(imageElement);
                }

                const visitText = document.createElement('div');
                visitText.textContent = 'Visit Us!';
                visitText.classList.add('button-popup');
                resultItem.appendChild(visitText);

                // Obtener la hora actual del lugar
                const currentTime = new Date().toLocaleTimeString('en-US', timeOptions[item.name]);
                if (currentTime) {
                    const dateTimeElement = document.createElement('p');
                    dateTimeElement.textContent = `Current time: ${currentTime}`;
                    const timeZone = timeOptions[item.name].timeZone;
                    const zoneElement = document.createElement('p');
                    zoneElement.textContent = `Time Zone: ${timeZone}`;
                    resultItem.appendChild(dateTimeElement);
                    resultItem.appendChild(zoneElement);
                }

                resultsPopup.appendChild(resultItem);
                resultCount++;
            }
        }
    }

    if (resultCount > 0) {
        thankyouMessage.textContent = 'Thank you for contacting us!';
    } else {
        thankyouMessage.textContent = 'No matches found, please search again.';
    }
    resultsPopup.prepend(thankyouMessage);
}

// Evento de búsqueda
document.getElementById('btnSearch').addEventListener('click', function() {
    const searchInput = document.getElementById('conditionInput').value.toLowerCase().trim();
    if (!searchInput) {
        return;
    }

    const searchTerms = {
        countries: ['country', 'countries', 'país', 'países', 'paises', 'pais'],
        temples: ['temple', 'temples', 'templo', 'templos'],
        beaches: ['beach', 'beaches', 'playa', 'playas']
    };

    let matchedTerms = [];
    for (const category in searchTerms) {
        if (searchTerms[category].some(term => searchInput.includes(term))) {
            matchedTerms.push(category);
        }
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verificar si los datos se obtienen correctamente
            if (matchedTerms.length > 0) {
                displayResults(data, matchedTerms);
            } else {
                // Mostrar mensaje de que no hay coincidencias
                const resultsPopup = document.getElementById('resultsPopup');
                resultsPopup.innerHTML = 'No matches found, please search again.';
                resultsPopup.style.display = 'block';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Evento de reset
document.getElementById('btnReset').addEventListener('click', function() {
    document.getElementById('resultsPopup').style.display = 'none';
    document.getElementById('conditionInput').value = '';
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    // Validar el correo electrónico
    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'aol.com'];

    if (!emailPattern.test(email)) {
        alert('Error: Por favor, introduce un correo electrónico válido.');
        return; // No enviar el formulario si el correo es inválido
    }

    const domain = email.split('@')[1];
    if (!validDomains.includes(domain)) {
        alert('Error: El dominio de correo electrónico no es válido.');
        return; // No enviar el formulario si el dominio es inválido
    }

    // Muestra el mensaje de agradecimiento
    alert('Your message has been sent successfully. Thank you!');

    // Limpia los campos del formulario
    document.getElementById('contactForm').reset();
});




