const catalogElement = document.getElementById('katalog');

// Funkcja ładująca dane
async function loadSmartwatches() {
    try {
        const response = await fetch('csvjson.json');
        const data = await response.json();

        // Filtrowanie: tylko smartwatch
        const smartwatches = data.filter(item => item.Kategoria && item.Kategoria.toLowerCase() === 'smartwatch');

        catalogElement.innerHTML = ''; // Czyścimy kontener

        smartwatches.forEach(watch => {
            const card = document.createElement('div');
            card.className = 'watch-card';

            // Logika zdjęcia
            let imagePath;
            if (watch.Zdjecia === "xxx" || !watch.Zdjecia) {
                imagePath = 'https://via.placeholder.com/300x300?text=Brak+Zdjecia';
            } else {
                // Jeśli masz kilka zdjęć po przecinku, bierzemy pierwsze
                const firstImage = watch.Zdjecia.split(',')[1] || watch.Zdjecia; 
                imagePath = `images/watches/${firstImage.trim()}`;
            }

            card.innerHTML = `
                <div class="image-container">
                    <img src="${imagePath}" alt="${watch.Nazwa}" onerror="this.src='https://via.placeholder.com/300x300?text=Błąd+ładowania'">
                </div>
                <div class="info">
                    <h3>${watch.Nazwa}</h3>
                    <p class="description">${watch.Opis || 'Brak opisu'}</p>
                    <div class="stock">Dostępna ilość: <strong>${watch.Ilosc}</strong></div>
                </div>
            `;
            catalogElement.appendChild(card);
        });
    } catch (error) {
        console.error('Błąd podczas ładowania danych:', error);
        catalogElement.innerHTML = '<p>Błąd ładowania produktów.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadSmartwatches);