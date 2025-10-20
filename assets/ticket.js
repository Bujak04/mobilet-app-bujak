// Wczytaj dane z localStorage
const ticketName = localStorage.getItem('selectedTicketName') || 'Miesięczny 2 jedn. adm. U';
const ticketPrice = localStorage.getItem('selectedTicketPrice') || '90.00';
const ticketCategory = localStorage.getItem('selectedTicketCategory') || 'miesieczne';
const lineNumber = localStorage.getItem('ticketLineNumber') || '';
const userName = localStorage.getItem('userName') || 'Jan';
const userSurname = localStorage.getItem('userSurname') || 'Kowalski';
const userIdNumber = localStorage.getItem('userIdNumber') || 'ABC123456';
const ticketNumber = localStorage.getItem('ticketNumber') || '123456789';
const controlNumber = localStorage.getItem('controlNumber') || '54321';
const validFrom = localStorage.getItem('ticketValidFrom') || '01.10.2025';
const purchaseTime = localStorage.getItem('ticketPurchaseDate') || new Date().toLocaleString('pl-PL');

const fullName = `${userName} ${userSurname}`;

// Pokaż odpowiednie pola w zależności od typu biletu
if (ticketCategory === 'jednorazowe') {
    // Bilet jednorazowy - pokaż tylko nr linii
    document.getElementById('oneTimeFields').style.display = 'block';
    if (lineNumber) {
        document.getElementById('lineNumberDisplay').textContent = lineNumber;
    }
} else {
    // Bilet miesięczny - pokaż pełne dane
    document.getElementById('monthlyFields').style.display = 'block';
    document.getElementById('monthlyFields2').style.display = 'block';
}

// Oblicz datę "ważny do" (do końca miesiąca)
const fromDateParts = validFrom.split('.');
const fromDate = new Date(fromDateParts[2], fromDateParts[1] - 1, fromDateParts[0]);
const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0); // Ostatni dzień miesiąca
const validUntil = toDate.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});

// Wypełnij dane biletu
document.getElementById('ticketTypeName').textContent = ticketName;
document.getElementById('ticketNumber').textContent = ticketNumber;
document.getElementById('controlNumber').textContent = controlNumber;
document.getElementById('ticketPrice').textContent = parseFloat(ticketPrice).toFixed(2) + ' PLN';
document.getElementById('purchaseTime').textContent = purchaseTime;

// Wypełnij dane tylko dla biletów miesięcznych
if (ticketCategory === 'miesieczne') {
    document.getElementById('idNumber').textContent = userIdNumber;
    document.getElementById('validUntil').textContent = validUntil;
    document.getElementById('ownerName').textContent = fullName;
    document.getElementById('validFrom').textContent = validFrom;
}

// Obszary administracyjne - wyświetl tylko dla biletów miesięcznych
if (ticketCategory === 'miesieczne') {
    const unitName = localStorage.getItem('ticketUnitName') || '';
    const ticketType = localStorage.getItem('selectedTicketType') || '';
    const unitsArea = document.getElementById('unitsArea');

    if (unitName && ticketType !== 'wszystkie') {
        // Podziel jednostki po przecinku jeśli jest ich więcej
        const units = unitName.split(', ');
        
        units.forEach((unit, index) => {
            const label = document.createElement('p');
            label.className = 'info-label';
            label.textContent = `Nazwa ${index + 1} jedn.adm:`;
            
            const value = document.createElement('p');
            value.className = 'info-value-big';
            value.textContent = unit;
            
            unitsArea.appendChild(label);
            unitsArea.appendChild(value);
        });
    }
}

// Generuj animowany kod QR
function generateQRAnimation() {
    const qrCode = document.getElementById('qrCode');
    
    // Prosta animacja - można rozbudować
    setInterval(() => {
        const randomPattern = Math.random() > 0.5 ? '45deg' : '135deg';
        qrCode.style.backgroundImage = `
            linear-gradient(${randomPattern}, #000 25%, transparent 25%, transparent 75%, #000 75%, #000),
            linear-gradient(${randomPattern}, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)
        `;
    }, 2000);
}

generateQRAnimation();

// Dodaj watermark (opcjonalnie)
console.log('🎫 Ten bilet jest FIKCYJNY - nie używaj go w prawdziwej komunikacji!');
