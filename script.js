const catalogElement = document.getElementById('katalog');

// Funkcja ładująca dane
async function loadSmartwatches() {
    try {
        const response = await fetch('csvjson.json?_=' + Date.now(), { cache: 'no-store' });
        const data = await response.json();
        
        // Handle both array and {products: [...]} formats
        const products = Array.isArray(data) ? data : (data.products || []);

        // Filtrowanie: tylko smartwatch
        const smartwatches = products.filter(item => item.Kategoria && item.Kategoria.toLowerCase() === 'smartwatch');

        catalogElement.innerHTML = ''; // Czyścimy kontener

        smartwatches.forEach(watch => {
            const card = document.createElement('div');
            card.className = 'watch-card';

            // Logika zdjęcia - bierzemy PIERWSZE zdjęcie (index 0)
            let imagePath;
            if (!watch.Zdjecia || watch.Zdjecia === "xxx") {
                imagePath = 'https://via.placeholder.com/300x300?text=Brak+Zdjecia';
            } else {
                const firstImage = watch.Zdjecia.split(',')[0];
                imagePath = `images/watches/${firstImage.trim()}`;
            }

            // Używamy Model jako nazwy, Opis.pl jako opisu
            const nazwa = watch.Model || watch.Nazwa || 'Bez nazwy';
            const opis = (watch.Opis && watch.Opis.pl) ? watch.Opis.pl : (watch.Opis || 'Brak opisu');

            card.innerHTML = `
                <div class="image-container">
                    <img src="${imagePath}" alt="${nazwa}" onerror="this.src='https://via.placeholder.com/300x300?text=Błąd+ładowania'">
                </div>
                <div class="info">
                    <h3>${nazwa}</h3>
                    <p class="description">${opis}</p>
                    <div class="stock">Dostępna ilość: <strong>${watch.Ilosc || 0}</strong></div>
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
