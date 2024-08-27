const contenedorPersonajes = document.querySelector('#contenedor-personajes');
const timelineText1 = document.querySelector('.timeline__text1');
const timelineText2 = document.querySelector('.timeline__text2');
const timelineText3 = document.querySelector('.timeline__text3');

// Función para obtener datos de la API
async function fetchCharacters(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Función para crear las tarjetas de personajes
async function createCharacterCards(pageNumber, startIndex, endIndex) {
    contenedorPersonajes.innerHTML = ''; 

    let characters = [];
    let nextPage = `https://swapi.dev/api/people/?page=${pageNumber}`;

    while (characters.length < endIndex && nextPage) {
        const data = await fetchCharacters(nextPage);
        characters.push(...data.results);
        nextPage = data.next;
    }

    // Filtrar los personajes según el rango especificado
    const charactersToShow = characters.slice(startIndex, endIndex);

    charactersToShow.forEach(personaje => {
        const tarjetaPersonaje = document.createElement('div');
        tarjetaPersonaje.classList.add('card');
        tarjetaPersonaje.style.display = 'none'; // Ocultamos la tarjeta por defecto

        // Construir el contenido de la tarjeta
        tarjetaPersonaje.innerHTML = `
            
            <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <p>Altura: ${personaje.height} cm</p>
                <p>Masa: ${personaje.mass} kg</p>
            </div>
        `;

        contenedorPersonajes.appendChild(tarjetaPersonaje);
    });

    return characters; // Devolver todos los personajes para futuras referencias
}

// Obtener los primeros 15 personajes y mostrarlos según los eventos del mouse
async function getFifteenCharacters() {
    const allCharacters = await createCharacterCards(1, 0, 15);

    // Mostrar los primeros 5 personajes al pasar el mouse sobre timelineText1
    timelineText1.addEventListener('mouseover', () => {
        const tarjetas = contenedorPersonajes.querySelectorAll('.card');
        tarjetas.forEach((tarjeta, index) => {
            tarjeta.style.display = index < 5 ? 'block' : 'none';
        });
    });

    // Mostrar los personajes del 6 al 10 al pasar el mouse sobre timelineText2
    timelineText2.addEventListener('mouseover', () => {
        const tarjetas = contenedorPersonajes.querySelectorAll('.card');
        tarjetas.forEach((tarjeta, index) => {
            tarjeta.style.display = index >= 5 && index < 10 ? 'block' : 'none';
        });
    });

    // Mostrar los personajes del 11 al 15 al pasar el mouse sobre timelineText3
    timelineText3.addEventListener('mouseover', () => {
        const tarjetas = contenedorPersonajes.querySelectorAll('.card');
        tarjetas.forEach((tarjeta, index) => {
            tarjeta.style.display = index >= 10 ? 'block' : 'none';
        });
    });
}

// Llamada inicial para obtener los primeros 15 personajes
getFifteenCharacters().catch(error => {
    console.error('Error al obtener los personajes:', error);
});