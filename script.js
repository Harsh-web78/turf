let selectedSlotData = null;
let currentSport = 'football';

const sportsConfig = {
    football: {
        img: 'https://images.unsplash.com/photo-1529900667825-073badbe6d1c?auto=format&fit=crop&q=80&w=1000',
        color: 'bg-lime-500'
    },
    cricket: {
        img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000',
        color: 'bg-blue-500'
    }
};

function toggleSport(sport) {
    currentSport = sport;
    const fbBtn = document.getElementById('btn-football');
    const crBtn = document.getElementById('btn-cricket');
    const heroImg = document.getElementById('hero-img');
    const bookBtn = document.getElementById('book-btn');

    heroImg.src = sportsConfig[sport].img;
    bookBtn.disabled = true;
    bookBtn.innerText = "Choose a Slot";
    selectedSlotData = null;

    if(sport === 'football') {
        fbBtn.className = "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-lime-500 text-black font-bold transition-all";
        crBtn.className = "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-gray-400 font-bold transition-all";
    } else {
        crBtn.className = "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 text-white font-bold transition-all";
        fbBtn.className = "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-gray-400 font-bold transition-all";
    }
    renderSlots();
}

function renderSlots() {
    const container = document.getElementById('slots-container');
    container.innerHTML = '';
    
    for (let hour = 6; hour <= 22; hour++) {
        const isPeak = hour >= 17 && hour <= 21;
        const price = isPeak ? 1200 : 800;
        const time = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
        const isBooked = Math.random() < 0.25;

        const slot = document.createElement('div');
        slot.className = `slot-card ${isBooked ? 'booked' : 'available'}`;
        slot.innerHTML = `
            ${isPeak && !isBooked ? '<span class="absolute top-1 right-1 text-[7px] bg-orange-500 text-white px-1 rounded italic font-bold">PEAK</span>' : ''}
            <p class="text-[9px] uppercase tracking-tighter text-gray-500">${time}</p>
            <p class="text-sm font-bold mt-0.5">₹${price}</p>
        `;

        if (!isBooked) {
            slot.onclick = () => {
                document.querySelectorAll('.slot-card').forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
                selectedSlotData = { time, price };
                const btn = document.getElementById('book-btn');
                btn.disabled = false;
                btn.innerHTML = `Book for ${time} • ₹${price} <i data-lucide="arrow-right" class="w-4 h-4"></i>`;
                lucide.createIcons();
            };
        }
        container.appendChild(slot);
    }
}

document.getElementById('book-btn').onclick = () => {
    document.getElementById('summary-text').innerText = `Royal Arena • ${selectedSlotData.time} • ₹${selectedSlotData.price}`;
    document.getElementById('modal').classList.remove('hidden');
};

function closeModal() { document.getElementById('modal').classList.add('hidden'); }

document.getElementById('booking-form').onsubmit = (e) => {
    e.preventDefault();
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('loader').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('success-screen').classList.remove('hidden');
        document.getElementById('success-msg').innerHTML = `Your slot for <b>${selectedSlotData.time}</b> is confirmed.<br>Gate access code: <b>#7792</b>`;
        lucide.createIcons();
    }, 2500);
};

// Initial Render
renderSlots();