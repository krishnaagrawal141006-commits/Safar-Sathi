/* ==========================================================================
   Safar-Sathi Trip Companion JS Logic Core
   ========================================================================== */

// 1. Initial State Definition
const DEFAULT_TRAVELERS = [
    { id: "local-user", name: "Aap (You)", role: "Organizer" }
];

const DEFAULT_PNR = {
    pnrNumber: "246-8101214",
    trainName: "Puri Express (22828)",
    coach: "B1",
    seats: "12, 14, 15, 17, 18, 20, 21 (Side-Lower & Main)"
};

const DEFAULT_ITINERARY = {
    "27-may": {
        dateStr: "May 27 (Wednesday)",
        badge: "Surat Departure 🚂",
        summary: "Train boarding day! Surat Railway Station se Puri Express train pakdenge raat ko. Journey shuru!",
        events: [
            { id: "e1", time: "09:00 PM", title: "Surat Station Par Ikattha Hona", desc: "Sabhi dost Surat Railway station platform par time se pahunchenge. Food packets aur board games double check karenge.", checked: false, isDefault: true },
            { id: "e2", time: "10:40 PM", title: "Puri Express (22828) Boarding", desc: "Train platform par aane par check-in. Seats adjust karenge, PNR and tickets TTE verification ke liye ready rakhein.", checked: false, isDefault: true }
        ]
    },
    "28-may": {
        dateStr: "May 28 (Thursday)",
        badge: "Train Journey 🎲🍲",
        summary: "Full day in train! Doston ke sath anand lenge: snacks, card games, train food aur aane wale trip ki planning.",
        events: [
            { id: "e3", time: "08:00 AM", title: "Subah ki Chai & Nashta", desc: "Train local vendors se hot chai aur Surat ke famous nashte (Khaman/Dhokla) ka anand.", checked: false, isDefault: true },
            { id: "e4", time: "02:00 PM", title: "Ludo, UNO & Games Session", desc: "Safar ke dauran compartment mein sabhi dost UNO cards, Ludo ya Mafia game khelenge.", checked: false, isDefault: true },
            { id: "e5", time: "08:00 PM", title: "Dinner & Budget Setup", desc: "Group expenses ko Safar-Sathi app par setup karna aur aane wale din ke schedule ki charcha.", checked: false, isDefault: true }
        ]
    },
    "29-may": {
        dateStr: "May 29 (Friday)",
        badge: "Khurda ➔ Lingaraj ➔ Puri 🕉️",
        summary: "Odisha arrival! Khurda Road Junction pahunch kar, pehle Bhubaneswar Lingaraj Temple darshan, fir Puri ke liye local bus.",
        events: [
            { id: "e6", time: "09:30 AM", title: "Khurda Road Jn Arrival (KUR)", desc: "Khurda Road station par train se utarenge. Saman sambhal kar local platform par chalenge.", checked: false, isDefault: true },
            { id: "e7", time: "10:15 AM", title: "Khurda Road to Bhubaneswar MEMU", desc: "MEMU local train se Bhubaneswar Station/Lingaraj Road ki cheap journey (Ticket ₹10 per head).", checked: false, isDefault: true },
            { id: "e8", time: "11:30 AM", title: "Lingaraj Temple Darshan (Lord Shiva)", desc: "Bhubaneswar ka 1000 saal purana shandar temple. Mobile/leather items strictly counter par deposit karenge. Beautiful darshan!", checked: false, isDefault: true },
            { id: "e9", time: "01:30 PM", title: "Mo Bus AC (Route 50) to Puri", desc: "Bhubaneswar Kalpana Square se Mo Bus AC pakdenge seedhe Puri Bus stand ke liye (Ticket ₹90 per head, super saving!).", checked: false, isDefault: true },
            { id: "e10", time: "03:30 PM", title: "Puri Hotel Check-in & Rest", desc: "Puri hotel/dharamshala pahunch kar rooms allocate karenge aur fresh up hokar thoda aaram.", checked: false, isDefault: true },
            { id: "e11", time: "06:00 PM", title: "Puri Golden Beach Sunset", desc: "Shaam ko Puri ke beautiful, clean Golden beach par thandi hawain, samosa/jhalmuri snacks aur beach walk.", checked: false, isDefault: true }
        ]
    },
    "30-may": {
        dateStr: "May 30 (Saturday)",
        badge: "Konark Sun Temple & Beach ☀️",
        summary: "Konark Sun Temple architectural marvel and beautiful Marine Drive road trip!",
        events: [
            { id: "e12", time: "08:00 AM", title: "Puri-Konark AC Bus Booking", desc: "No License? No problem! Mo Bus Route 53 AC (Fare ₹50 per head) ya OTDC Government sightseeing AC bus book karenge (approx ₹350 per round trip). Live booking check-in!", checked: false, isDefault: true },
            { id: "e13", time: "09:30 AM", title: "Puri-Konark Scenic Highway Trip", desc: "Behad khoobsurat sea-facing highway. Raste mein marine forests aur beach views dekhte hue 35km ki bus ride ka anand.", checked: false, isDefault: true },
            { id: "e14", time: "10:45 AM", title: "Konark Sun Temple Exploration", desc: "Kala Pagoda (Sun Temple) ka adbhut stone architecture. Guide lekar Chariot Wheels aur mathematical stone designs ki history samjhenge.", checked: false, isDefault: true },
            { id: "e15", time: "01:30 PM", title: "Local Odia lunch near Konark", desc: "Local standard veg/fish thali ka anand. Traditional Dalma veg dish try karenge.", checked: false, isDefault: true },
            { id: "e16", time: "05:00 PM", title: "Chandrabhaga Beach Sunset", desc: "Shanti bhara beach, shaam ko beautiful sunset aur wave sound enjoy karenge. Ocean breeze ka anand.", checked: false, isDefault: true },
            { id: "e17", time: "08:00 PM", title: "Puri Return & Grand Road Walk", desc: "Puri wapas aakar Swargadwar bazaar aur Grand Road (Bada Danda) par shopping aur dinner.", checked: false, isDefault: true }
        ]
    },
    "31-may": {
        dateStr: "May 31 (Sunday)",
        badge: "Jagannath Darshan & Chilika Lake ⛵",
        summary: "Puri Jagannath Temple main Darshan & Satapada Chilika Lake boat cruise with dolphins!",
        events: [
            { id: "e18", time: "06:00 AM", title: "Shree Jagannath Temple Darshan", desc: "Subah jaldi line mein lagenge taaki peaceful darshan ho sakein. Earthen pots mein banta Mahaprasad book karenge.", checked: false, isDefault: true },
            { id: "e19", time: "09:30 AM", title: "Breakfast & OSRTC Bus to Satapada", desc: "Puri stand se cheap Government bus or mini-bus se Satapada (Chilika Lake) ke liye rawana (Fare ₹50 per head, distance 50km).", checked: false, isDefault: true },
            { id: "e20", time: "11:30 AM", title: "OTDC Government Boating Counter", desc: "Direct government ticket booking counter par jayenge. Cheat agents se bachkar fixed rate per boat book karenge.", checked: false, isDefault: true },
            { id: "e21", time: "12:00 PM", title: "Dolphin Spotting & Sea Mouth Boat Ride", desc: "Boating karte hue famous Irrawaddy Dolphins ko dekhenge. Sea Mouth par chalkar jahan lake aur ocean milte hain wahan ghumenge.", checked: false, isDefault: true },
            { id: "e22", time: "02:30 PM", title: "Fresh Seafood Feast in Satapada", desc: "Jheel ke paas fresh cooked crab/prawns aur traditional fish curry lunch (highly recommended veg dishes available too).", checked: false, isDefault: true },
            { id: "e23", time: "07:00 PM", title: "Puri Return & Anand Bazar Dinner", desc: "Puri wapas aakar booked Mahaprasad (Abadha) ko Anand Bazar mein Traditional tarike se sabhi dost milkar khayenge.", checked: false, isDefault: true }
        ]
    },
    "01-jun": {
        dateStr: "June 1 (Monday)",
        badge: "Shopping & Local Exploring 🛍️",
        summary: "Puri Local beaches exploration and world-famous Khaja sweets/handloom shopping.",
        events: [
            { id: "e24", time: "08:30 AM", title: "Swargadwar Beach Morning Dip", desc: "Puri ke dynamic beach par dip lena aur waves ke sath khelna. Fun times with friends!", checked: false, isDefault: true },
            { id: "e25", time: "11:00 AM", title: "Famous Khaja Sweets Shopping", desc: "Grand road par Jagannath mandir ke paas authentic shops se crispy Khaja sweets khareedna family aur doston ke liye.", checked: false, isDefault: true },
            { id: "e26", time: "03:00 PM", title: "Pipili Handlooms & Sambalpuri Shopping", desc: "Traditional colourful applique works, Sambalpuri cotton shirts aur souvenirs khareedna.", checked: false, isDefault: true },
            { id: "e27", time: "07:00 PM", title: "Last Night Beach Party/Dinner", desc: "Shaam ko beach side cafes mein, soft music aur sea shore par doston ke sath yatra ke pyare moments share karna.", checked: false, isDefault: true }
        ]
    },
    "02-jun": {
        dateStr: "June 2 (Tuesday)",
        badge: "Farewell Puri 👋🚂",
        summary: "Final morning beach view and heading back to Surat with beautiful golden memories.",
        events: [
            { id: "e28", time: "05:15 AM", title: "Final Beach Sunrise View", desc: "Puri ka unmatched early morning sunrise. Sabhi doston ki premium group photos aur selfies click karna.", checked: false, isDefault: true },
            { id: "e29", time: "09:00 AM", title: "Hotel Checkout & Travel to Station", desc: "Hotel rooms check out karenge. Return trains/flights pakadne ke liye Khurda Road / Bhubaneswar railway station rawana.", checked: false, isDefault: true },
            { id: "e30", time: "01:30 PM", title: "Return Journey to Surat", desc: "Sweet memories ke sath train board karenge. PNR status check karenge and journey starts.", checked: false, isDefault: true }
        ]
    }
};

const DEFAULT_PACKING = [
    { id: "p1", name: "Aadhaar Card / Government Photo IDs", category: "documents", assignee: "Sabhi (All)", checked: false },
    { id: "p2", name: "Train Hardcopy Tickets / E-Tickets PDF", category: "documents", assignee: "Aap (You)", checked: false },
    { id: "p3", name: "Hotel Booking Confirmation Receipts", category: "documents", assignee: "Aap (You)", checked: false },
    { id: "p4", name: "Light Cotton clothes for Coastal weather", category: "clothing", assignee: "Sabhi (All)", checked: false },
    { id: "p5", name: "Temple Decent Clothing (Kurta/Pajama, No shorts/sleeveless)", category: "clothing", assignee: "Sabhi (All)", checked: false },
    { id: "p6", name: "Beach Slippers & Extra Towels", category: "clothing", assignee: "Sabhi (All)", checked: false },
    { id: "p7", name: "Sunscreen Lotion (SPF 30+ SPF for beach sun)", category: "toiletries", assignee: "Aap (You)", checked: false },
    { id: "p8", name: "First Aid Kit (Band-aids, Painkillers, Ors, Vomiting tablets)", category: "toiletries", assignee: "Aap (You)", checked: false },
    { id: "p9", name: "Toothbrush, Soap & Toiletries pouch", category: "toiletries", assignee: "Sabhi (All)", checked: false },
    { id: "p10", name: "Powerbanks (20,000mAh for train & travels)", category: "electronics", assignee: "Sabhi (All)", checked: false },
    { id: "p11", name: "DSLR Camera & Extra Memory Card", category: "electronics", assignee: "Sabhi (All)", checked: false },
    { id: "p12", name: "UNO Cards, Playing Cards for train gaming", category: "electronics", assignee: "Sabhi (All)", checked: false },
    { id: "p13", name: "Bluetooth Waterproof Speaker", category: "electronics", assignee: "Aap (You)", checked: false }
];

const BUS_ROUTES_DB = [
    {
        number: "Route 50 AC",
        type: "Mo Bus (AC)",
        from: "Bhubaneswar Railway Station",
        to: "Puri Bus Stand",
        timing: "First Bus: 06:00 AM | Last Bus: 08:30 PM (Every 30-40 mins)",
        fare: "₹90 per person",
        saves: "Saves approx ₹1,800 over private cab!",
        stops: "Master Cuttack, Kalpana Square, Uttara, Pipili, Sakhigopal, Puri Bus Stand",
        filter: "to-puri"
    },
    {
        number: "Route 50 Non-AC",
        type: "Mo Bus (Non-AC)",
        from: "Bhubaneswar Railway Station",
        to: "Puri Bus Stand",
        timing: "First Bus: 06:30 AM | Last Bus: 07:45 PM (Every 40 mins)",
        fare: "₹60 per person",
        saves: "Saves approx ₹2,000 over private cab!",
        stops: "Kalpana, Uttara, Pipili, Puri Stand",
        filter: "to-puri"
    },
    {
        number: "Route 53 AC",
        type: "Mo Bus (AC)",
        from: "Puri Bus Stand",
        to: "Konark Sun Temple",
        timing: "First Bus: 06:30 AM | Last Bus: 07:00 PM (Every 45 mins)",
        fare: "₹50 per person",
        saves: "Saves approx ₹1,500 over private taxi!",
        stops: "Puri Bus Stand, Swargadwar, Marine Drive Road, Chandrabhaga Beach, Konark Sun Temple",
        filter: "to-konark"
    },
    {
        number: "Route 53 Non-AC",
        type: "Mo Bus (Non-AC)",
        from: "Puri Bus Stand",
        to: "Konark Sun Temple",
        timing: "First Bus: 07:00 AM | Last Bus: 06:00 PM (Every 1 hour)",
        fare: "₹30 per person",
        saves: "Saves approx ₹1,700 over private taxi!",
        stops: "Puri Bus Stand, Marine Drive, Konark Temple",
        filter: "to-konark"
    },
    {
        number: "Satapada Express",
        type: "OSRTC Government Bus",
        from: "Puri Bus Stand",
        to: "Satapada (Chilika Lake)",
        timing: "First Bus: 06:30 AM | Last Bus: 05:00 PM (Every 1 hour)",
        fare: "₹60 per person",
        saves: "Saves approx ₹2,000 over private cab split!",
        stops: "Puri Stand, Brahmagiri, Satapada Boating Point",
        filter: "to-chilika"
    },
    {
        number: "KUR-BBS MEMU",
        type: "Local Passenger Train",
        from: "Khurda Road Jn (KUR)",
        to: "Bhubaneswar Railway Station",
        timing: "Frequent (Almost every 20-30 mins, 24 Hours)",
        fare: "₹10 per person",
        saves: "Saves approx ₹400 over auto/cab drop!",
        stops: "Khurda Road, Retang, Lingaraj Temple Road, Bhubaneswar",
        filter: "local-memu"
    }
];

// 2. Application Variables & State
let appState = {
    travelers: [...DEFAULT_TRAVELERS],
    pnr: { ...DEFAULT_PNR },
    itinerary: JSON.parse(JSON.stringify(DEFAULT_ITINERARY)),
    expenses: [],
    packing: [...DEFAULT_PACKING],
    sharedLocations: [], // Shared friend locations parsed from URLs
    activeTab: "dashboard",
    selectedItineraryDay: "29-may" // Defaults to May 29 (Arrival day)
};

// Map Reference
let leafletMap = null;
let leafletMapMarkers = {};
let isDemoLocationsActive = false;

// 3. Load & Save Utilities (LocalStorage)
function loadStateFromLocalStorage() {
    try {
        const saved = localStorage.getItem("safarsathi_state");
        if (saved) {
            const parsed = JSON.parse(saved);
            
            // Validate basic arrays/objects exist, if not use defaults
            appState.travelers = parsed.travelers || [...DEFAULT_TRAVELERS];
            appState.pnr = parsed.pnr || { ...DEFAULT_PNR };
            appState.itinerary = parsed.itinerary || JSON.parse(JSON.stringify(DEFAULT_ITINERARY));
            appState.expenses = parsed.expenses || [];
            appState.packing = parsed.packing || [...DEFAULT_PACKING];
            appState.sharedLocations = parsed.sharedLocations || [];
        }
    } catch (e) {
        console.error("Could not load from localStorage: ", e);
    }
}

function saveStateToLocalStorage() {
    try {
        localStorage.setItem("safarsathi_state", JSON.stringify(appState));
        // Real-Time Firebase Group Sync Write
        if (db && activeGroupPin) {
            db.collection("groups").doc(activeGroupPin).update({
                travelers: appState.travelers,
                pnr: appState.pnr,
                itinerary: appState.itinerary,
                expenses: appState.expenses,
                packing: appState.packing
            }).catch(err => {
                console.error("Firestore real-time sync write failed: ", err);
            });
        }
    } catch (e) {
        console.error("Could not save to localStorage: ", e);
    }
}

// 4. Initializer Function
window.addEventListener("DOMContentLoaded", () => {
    // A. Load data
    loadStateFromLocalStorage();
    
    // B. Check URL query parameters for location imports
    parseUrlLocationParameters();
    
    // C. Initialize all parts of the application
    initTabSwitching();
    initCountdownClock();
    renderTravelersPanel();
    initPnrComponent();
    initItineraryComponent();
    initExpenseComponent();
    initPackingComponent();
    initBusFinderComponent();
    initMapComponent(); // Set up Leaflet map
    initSettingsComponent();
    initFoodCalculatorComponent();

    // D. Update all dashboard dynamic statistics
    updateDashboardStats();
    
    // Proactive Firebase UI Initialization
    initFirebaseUI();

    // E. Update friend count badge on load
    const badge = document.getElementById("friend-count-badge");
    if (badge) badge.innerText = `${appState.travelers.length} Travelers`;

    // F. Handle add friend form submission
    const addFriendForm = document.getElementById("add-friend-form");
    if (addFriendForm) {
        addFriendForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nameInput = document.getElementById("input-new-friend-name");
            const name = nameInput.value.trim();
            if (name) {
                const numericIds = appState.travelers.map(t => parseInt(t.id)).filter(id => !isNaN(id));
                const nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
                appState.travelers.push({
                    id: nextId,
                    name: name,
                    role: "Sathi"
                });
                saveStateToLocalStorage();
                
                nameInput.value = "";
                
                if (badge) badge.innerText = `${appState.travelers.length} Travelers`;
                
                renderTravelersPanel();
                initExpenseComponent();
                initPackingComponent();
                updateDashboardStats();
                renderSettleMatrix();
                renderIndividualBalances();
                
                if (isDemoLocationsActive) {
                    plotDemoLocationsOnMap();
                }
                
                alert(`Dost "${name}" ko successfully group me add kar diya gaya hai!`);
            }
        });
    }
});

// 5. Countdown Clock Logic (Targeting May 27, 21:00 Surat departure)
function initCountdownClock() {
    const targetDate = new Date("May 27, 2026 21:00:00").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;
        
        const cDays = document.getElementById("cd-days");
        const cHours = document.getElementById("cd-hours");
        const cMins = document.getElementById("cd-mins");
        const cSecs = document.getElementById("cd-secs");
        const headerCountdownBadge = document.getElementById("trip-countdown-text");
        
        if (difference < 0) {
            // Journey started!
            if (cDays) {
                cDays.innerText = "00";
                cHours.innerText = "00";
                cMins.innerText = "00";
                cSecs.innerText = "00";
            }
            if (headerCountdownBadge) {
                headerCountdownBadge.innerText = "Safar Shuru ho chuka hai! 🚂✨";
            }
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Pad with leading zeros
        const pad = (num) => String(num).padStart(2, '0');
        
        if (cDays) {
            cDays.innerText = pad(days);
            cHours.innerText = pad(hours);
            cMins.innerText = pad(minutes);
            cSecs.innerText = pad(seconds);
        }
        
        if (headerCountdownBadge) {
            headerCountdownBadge.innerText = `${days} Days, ${hours} Hours remaining!`;
        }
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// 6. Navigation / Tab Switching
function initTabSwitching() {
    const navItems = document.querySelectorAll(".nav-item");
    const screens = document.querySelectorAll(".app-screen");
    
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetTab = item.getAttribute("data-tab");
            
            // Update active states in navigation
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
            
            // Switch visible screens with animation
            screens.forEach(screen => {
                screen.classList.remove("active");
                if (screen.id === targetTab) {
                    screen.classList.add("active");
                }
            });
            
            appState.activeTab = targetTab;
            
            // Leaflet Map requires invalidation of size when container switches tabs
            if (targetTab === "tracker" && leafletMap) {
                setTimeout(() => {
                    leafletMap.invalidateSize();
                }, 250);
            }
        });
    });
}

// 7. Dashboard Dynamic Stats Calculator
function updateDashboardStats() {
    // 1. Total Expenses & individual share
    let totalSpent = 0;
    appState.expenses.forEach(e => totalSpent += Number(e.amount));
    
    const perShare = totalSpent > 0 ? Math.round(totalSpent / appState.travelers.length) : 0;
    
    document.getElementById("stats-total-expense").innerText = `₹${totalSpent.toLocaleString('en-IN')}`;
    document.getElementById("stats-per-share").innerText = `₹${perShare.toLocaleString('en-IN')}`;
    
    // 2. Packing Checklist progress
    const totalItems = appState.packing.length;
    const checkedItems = appState.packing.filter(p => p.checked).length;
    const percentage = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
    
    document.getElementById("stats-packing-progress").innerText = `${percentage}%`;
    
    const progressBadge = document.getElementById("packing-progress-badge");
    if (progressBadge) {
        progressBadge.innerText = `${checkedItems} / ${totalItems} Checked`;
    }
    
    const progressBar = document.getElementById("packing-progress-bar");
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
}

// 8. Active Travelers Manager Card
function renderTravelersPanel() {
    const container = document.getElementById("friends-list-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    appState.travelers.forEach(t => {
        const item = document.createElement("div");
        item.className = "friend-item";
        
        const avatarLetter = t.name.charAt(0).toUpperCase();
        const isSelf = (t.id === 0 || t.id === "local-user" || (currentUser && t.id === currentUser.uid));
        
        item.innerHTML = `
            <div class="friend-avatar-info">
                <div class="friend-badge">${avatarLetter}</div>
                <div>
                    <div class="friend-name">${t.name}</div>
                    <div class="friend-role">${t.role}</div>
                </div>
            </div>
            ${!isSelf ? `<button class="btn-edit-friend-name" data-id="${t.id}" title="Edit Name">✏️</button>` : `<span class="friend-role" style="font-style: italic;">Aap</span>`}
        `;
        
        container.appendChild(item);
    });
    
    // Attach listener to edit friend name buttons
    document.querySelectorAll(".btn-edit-friend-name").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const rawId = btn.getAttribute("data-id");
            const id = isNaN(rawId) ? rawId : Number(rawId);
            const friendIndex = appState.travelers.findIndex(t => t.id === id);
            
            if (friendIndex !== -1) {
                const currentName = appState.travelers[friendIndex].name;
                const newName = prompt(`Enter new name for ${currentName}:`, currentName);
                
                if (newName && newName.trim() !== "") {
                    appState.travelers[friendIndex].name = newName.trim();
                    saveStateToLocalStorage();
                    
                    // Re-render components relying on traveler list
                    renderTravelersPanel();
                    initExpenseComponent(); // Repopulate Who Paid select dropdown
                    initPackingComponent(); // Repopulate Assignee select dropdown
                    updateDashboardStats();
                    renderSettleMatrix();
                    renderIndividualBalances();
                    
                    // Update map markers if demo mode is active
                    if (isDemoLocationsActive) {
                        plotDemoLocationsOnMap();
                    }
                }
            }
        });
    });
}

// 9. PNR Saver & Modifier Component
function initPnrComponent() {
    const savedPnr = document.getElementById("saved-pnr");
    const savedTrain = document.getElementById("saved-train-name");
    const savedCoach = document.getElementById("saved-coach");
    const savedSeats = document.getElementById("saved-seats");
    
    const editBtn = document.getElementById("edit-pnr-btn");
    const viewDiv = document.getElementById("pnr-display-view");
    const form = document.getElementById("pnr-edit-form");
    const cancelBtn = document.getElementById("cancel-pnr-btn");
    
    const inputPnr = document.getElementById("input-pnr");
    const inputTrain = document.getElementById("input-train");
    const inputCoach = document.getElementById("input-coach");
    const inputSeats = document.getElementById("input-seats");
    
    const renderPnrDisplay = () => {
        savedPnr.innerText = appState.pnr.pnrNumber;
        savedTrain.innerText = appState.pnr.trainName;
        savedCoach.innerText = appState.pnr.coach;
        savedSeats.innerText = appState.pnr.seats;
    };
    
    renderPnrDisplay();
    
    editBtn.addEventListener("click", () => {
        // Pre-fill inputs with current state values
        inputPnr.value = appState.pnr.pnrNumber;
        inputTrain.value = appState.pnr.trainName;
        inputCoach.value = appState.pnr.coach;
        inputSeats.value = appState.pnr.seats;
        
        viewDiv.classList.add("hidden");
        form.classList.remove("hidden");
    });
    
    cancelBtn.addEventListener("click", () => {
        form.classList.add("hidden");
        viewDiv.classList.remove("hidden");
    });
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        appState.pnr = {
            pnrNumber: inputPnr.value.trim() || "N/A",
            trainName: inputTrain.value.trim() || "N/A",
            coach: inputCoach.value.trim() || "N/A",
            seats: inputSeats.value.trim() || "N/A"
        };
        
        saveStateToLocalStorage();
        renderPnrDisplay();
        
        form.classList.add("hidden");
        viewDiv.classList.remove("hidden");
    });
}

// 10. Smart Itinerary System
function initItineraryComponent() {
    const dayContainer = document.getElementById("day-selectors-container");
    if (!dayContainer) return;
    
    dayContainer.innerHTML = "";
    
    // A. Render Day Buttons (27 May to 2 June)
    Object.keys(appState.itinerary).forEach(dayKey => {
        const item = appState.itinerary[dayKey];
        const btn = document.createElement("button");
        btn.className = `day-selector-btn ${appState.selectedItineraryDay === dayKey ? 'active' : ''}`;
        btn.setAttribute("data-day", dayKey);
        
        btn.innerHTML = `
            <span class="day-title">${dayKey.replace("-", " ").toUpperCase()}</span>
            <span class="day-subtitle">${item.badge}</span>
        `;
        
        btn.addEventListener("click", () => {
            document.querySelectorAll(".day-selector-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            appState.selectedItineraryDay = dayKey;
            renderSelectedDayPlan();
        });
        
        dayContainer.appendChild(btn);
    });
    
    // B. Handle custom event creation
    const addEventForm = document.getElementById("add-event-form");
    addEventForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const timeInput = document.getElementById("input-event-time");
        const titleInput = document.getElementById("input-event-title");
        const descInput = document.getElementById("input-event-desc");
        
        const newEvent = {
            id: "custom_" + Date.now(),
            time: timeInput.value.trim(),
            title: titleInput.value.trim(),
            desc: descInput.value.trim() || "",
            checked: false,
            isDefault: false
        };
        
        appState.itinerary[appState.selectedItineraryDay].events.push(newEvent);
        saveStateToLocalStorage();
        renderSelectedDayPlan();
        
        // Reset form inputs
        titleInput.value = "";
        descInput.value = "";
        timeInput.value = "";
    });
    
    renderSelectedDayPlan();
}

function renderSelectedDayPlan() {
    const currentDay = appState.itinerary[appState.selectedItineraryDay];
    
    document.getElementById("selected-day-title").innerText = currentDay.dateStr;
    document.getElementById("selected-day-badge").innerText = currentDay.badge;
    document.getElementById("selected-day-summary").innerText = currentDay.summary;
    
    const timelineContainer = document.getElementById("day-timeline-container");
    timelineContainer.innerHTML = "";
    
    if (currentDay.events.length === 0) {
        timelineContainer.innerHTML = `<div class="settle-empty-state">Is din ke liye koi plans/events nahi hain. Neeche se add karein!</div>`;
        return;
    }
    
    currentDay.events.forEach(ev => {
        const item = document.createElement("div");
        item.className = `timeline-item ${ev.checked ? 'done' : ''}`;
        
        item.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content-box">
                <div>
                    <span class="event-time">${ev.time}</span>
                    <h4 class="event-title">${ev.title}</h4>
                    ${ev.desc ? `<p class="event-desc">${ev.desc}</p>` : ''}
                </div>
                <div class="event-actions">
                    <button class="btn-check-event" data-id="${ev.id}" title="Toggle Complete">
                        ${ev.checked ? '↩️' : '✓'}
                    </button>
                    ${!ev.isDefault ? `<button class="btn-delete-event" data-id="${ev.id}" title="Delete Custom Event">🗑️</button>` : ''}
                </div>
            </div>
        `;
        
        timelineContainer.appendChild(item);
    });
    
    // Attach event checkbox triggers
    document.querySelectorAll(".btn-check-event").forEach(btn => {
        btn.addEventListener("click", () => {
            const evId = btn.getAttribute("data-id");
            const evIndex = appState.itinerary[appState.selectedItineraryDay].events.findIndex(e => e.id === evId);
            
            if (evIndex !== -1) {
                appState.itinerary[appState.selectedItineraryDay].events[evIndex].checked = !appState.itinerary[appState.selectedItineraryDay].events[evIndex].checked;
                saveStateToLocalStorage();
                renderSelectedDayPlan();
            }
        });
    });
    
    // Attach event delete triggers for custom events
    document.querySelectorAll(".btn-delete-event").forEach(btn => {
        btn.addEventListener("click", () => {
            const evId = btn.getAttribute("data-id");
            if (confirm("Kya aap sach me is plan ko timeline se hatana chahte hain?")) {
                appState.itinerary[appState.selectedItineraryDay].events = appState.itinerary[appState.selectedItineraryDay].events.filter(e => e.id !== evId);
                saveStateToLocalStorage();
                renderSelectedDayPlan();
            }
        });
    });
}

// 11. Smart Hisab-Kitab Group Expense Splitter
function initExpenseComponent() {
    // Populate Who Paid select dropdown in Form
    const payerSelect = document.getElementById("expense-payer");
    if (payerSelect) {
        payerSelect.innerHTML = "";
        appState.travelers.forEach(t => {
            const opt = document.createElement("option");
            opt.value = t.id;
            const isSelf = (t.id === 0 || t.id === "local-user" || (currentUser && t.id === currentUser.uid));
            opt.innerText = isSelf ? "Aap (You)" : t.name;
            payerSelect.appendChild(opt);
        });
    }
    
    // Attach form submit handler
    const form = document.getElementById("add-expense-form");
    if (form) {
        // Remove existing listeners to avoid multiple attachments on re-init
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        newForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const titleInput = document.getElementById("expense-title");
            const amountInput = document.getElementById("expense-amount");
            const categorySelect = document.getElementById("expense-category");
            const payerSelect = document.getElementById("expense-payer");
            
            const rawPayerVal = payerSelect.value;
            const payerId = isNaN(rawPayerVal) ? rawPayerVal : Number(rawPayerVal);
            
            const newExp = {
                id: "exp_" + Date.now(),
                title: titleInput.value.trim(),
                amount: Number(amountInput.value),
                payerId: payerId,
                category: categorySelect.value,
                date: new Date().toLocaleDateString('en-IN')
            };
            
            appState.expenses.push(newExp);
            saveStateToLocalStorage();
            
            // Reset form
            titleInput.value = "";
            amountInput.value = "";
            
            // Re-render all expense views and update stats
            renderExpenseLedger();
            renderSettleMatrix();
            renderIndividualBalances();
            updateDashboardStats();
        });
    }
    
    // Clear all expenses button
    const clearBtn = document.getElementById("btn-clear-expenses");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (confirm("Kya aap poore expenses aur split data ko clear karna chahte hain?")) {
                appState.expenses = [];
                saveStateToLocalStorage();
                
                renderExpenseLedger();
                renderSettleMatrix();
                renderIndividualBalances();
                updateDashboardStats();
            }
        });
    }
    
    // Initial renders
    renderExpenseLedger();
    renderSettleMatrix();
    renderIndividualBalances();
}

function renderExpenseLedger() {
    const tbody = document.getElementById("expense-history-tbody");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    if (appState.expenses.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;" class="small">Ledger me koi kharcha nahi hai. Split karne ke liye upar form bharein!</td></tr>`;
        return;
    }
    
    // Render in reverse chronological order (newest first)
    [...appState.expenses].reverse().forEach(exp => {
        const tr = document.createElement("tr");
        const payer = appState.travelers.find(t => t.id === exp.payerId);
        const payerName = payer ? payer.name : "Unknown";
        
        let catEmoji = "📦";
        if (exp.category === "travel") catEmoji = "🚂";
        else if (exp.category === "food") catEmoji = "🍽️";
        else if (exp.category === "stay") catEmoji = "🏨";
        else if (exp.category === "tickets") catEmoji = "🎟️";
        
        const individualShare = Math.round(exp.amount / appState.travelers.length);
        
        tr.innerHTML = `
            <td>
                <strong>${exp.title}</strong>
                <span class="small" style="display:block;">${exp.date}</span>
            </td>
            <td><span class="category-tag ${exp.category}">${catEmoji} ${exp.category}</span></td>
            <td>${(exp.payerId === 0 || exp.payerId === "local-user" || (currentUser && exp.payerId === currentUser.uid)) ? "<strong>Aap (You)</strong>" : payerName}</td>
            <td><strong>₹${exp.amount.toLocaleString('en-IN')}</strong></td>
            <td class="small">₹${individualShare.toLocaleString('en-IN')} per head</td>
            <td><button class="btn-delete btn-delete-expense" data-id="${exp.id}" title="Delete Expense">🗑️</button></td>
        `;
        
        tbody.appendChild(tr);
    });
    
    // Attach individual expense deletion triggers
    document.querySelectorAll(".btn-delete-expense").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            if (confirm("Kya aap is kharch ko delete karna chahte hain?")) {
                appState.expenses = appState.expenses.filter(e => e.id !== id);
                saveStateToLocalStorage();
                
                renderExpenseLedger();
                renderSettleMatrix();
                renderIndividualBalances();
                updateDashboardStats();
            }
        });
    });
}

// smart debt-simplification matrix algorithm
function renderSettleMatrix() {
    const container = document.getElementById("settle-matrix-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    // Calculate balances for each traveler: Spent - (Total / 7)
    let totalSpent = 0;
    const spentByFriend = {};
    
    // Initialize spent values
    appState.travelers.forEach(t => spentByFriend[t.id] = 0);
    
    // Accumulate spent values
    appState.expenses.forEach(e => {
        spentByFriend[e.payerId] = (spentByFriend[e.payerId] || 0) + Number(e.amount);
        totalSpent += Number(e.amount);
    });
    
    const averageShare = totalSpent / appState.travelers.length;
    
    // Net balance: positive means they receive money, negative means they owe money
    const balances = appState.travelers.map(t => {
        return {
            id: t.id,
            name: t.name,
            balance: spentByFriend[t.id] - averageShare
        };
    });
    
    // Separate into debtors (owe money, balance < 0) and creditors (receive money, balance > 0)
    let debtors = balances.filter(b => b.balance < -0.1).sort((a,b) => a.balance - b.balance); // sorted by largest debt
    let creditors = balances.filter(b => b.balance > 0.1).sort((a,b) => b.balance - a.balance); // sorted by largest credit
    
    const transactions = [];
    
    let dIdx = 0;
    let cIdx = 0;
    
    // Deep copies to modify during matching
    const debtorsArr = debtors.map(d => ({ ...d }));
    const creditorsArr = creditors.map(c => ({ ...c }));
    
    // Match debtors with creditors to simplify debts
    while (dIdx < debtorsArr.length && cIdx < creditorsArr.length) {
        const debtor = debtorsArr[dIdx];
        const creditor = creditorsArr[cIdx];
        
        const debtOwed = Math.abs(debtor.balance);
        const creditAvailable = creditor.balance;
        
        const transferAmount = Math.min(debtOwed, creditAvailable);
        
        transactions.push({
            from: debtor.name,
            fromId: debtor.id,
            to: creditor.name,
            toId: creditor.id,
            amount: Math.round(transferAmount)
        });
        
        // Update balances
        debtor.balance += transferAmount;
        creditor.balance -= transferAmount;
        
        if (Math.abs(debtor.balance) < 0.1) dIdx++;
        if (creditor.balance < 0.1) cIdx++;
    }
    
    // Render transactions list
    if (transactions.length === 0) {
        container.innerHTML = `<div class="settle-empty-state">Sabhi doston ka hisab barabar hai! Ekdum perfect settle! 🤝🎉</div>`;
        return;
    }
    
    transactions.forEach(t => {
        const item = document.createElement("div");
        item.className = "settle-item";
        
        const isSenderSelf = (t.fromId === 0 || t.fromId === "local-user" || (currentUser && t.fromId === currentUser.uid));
        const isReceiverSelf = (t.toId === 0 || t.toId === "local-user" || (currentUser && t.toId === currentUser.uid));
        
        const senderText = isSenderSelf ? "Aap (You)" : t.from;
        const receiverText = isReceiverSelf ? "Aap (You)" : t.to;
        
        item.innerHTML = `
            <div class="settle-parties">
                <span class="debtor">${senderText}</span>
                <span class="arrow-icon">➔ Dega ➔</span>
                <span class="creditor">${receiverText}</span>
            </div>
            <span class="settle-amount">₹${t.amount.toLocaleString('en-IN')}</span>
        `;
        container.appendChild(item);
    });
}

function renderIndividualBalances() {
    const container = document.getElementById("individual-balances-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    let totalSpent = 0;
    const spentByFriend = {};
    
    appState.travelers.forEach(t => spentByFriend[t.id] = 0);
    
    appState.expenses.forEach(e => {
        spentByFriend[e.payerId] = (spentByFriend[e.payerId] || 0) + Number(e.amount);
        totalSpent += Number(e.amount);
    });
    
    const averageShare = totalSpent / appState.travelers.length;
    
    appState.travelers.forEach(t => {
        const balance = Math.round(spentByFriend[t.id] - averageShare);
        
        const item = document.createElement("div");
        item.className = "balance-item";
        
        let valClass = "zero";
        let displaySign = "";
        
        if (balance > 1) {
            valClass = "positive";
            displaySign = "+";
        } else if (balance < -1) {
            valClass = "negative";
        }
        
        const isSelf = (t.id === 0 || t.id === "local-user" || (currentUser && t.id === currentUser.uid));
        const displayName = isSelf ? "Aap (You)" : t.name;
        
        item.innerHTML = `
            <span class="balance-name">${displayName}</span>
            <span class="balance-value ${valClass}">${displaySign}₹${balance.toLocaleString('en-IN')}</span>
        `;
        
        container.appendChild(item);
    });
}

// 12. Coordinated Packing Checklist Component
function initPackingComponent() {
    // Populate Assignee dropdown inside Add Packing form
    const assigneeSelect = document.getElementById("packing-item-assignee");
    if (assigneeSelect) {
        assigneeSelect.innerHTML = "";
        
        const optAll = document.createElement("option");
        optAll.value = "Sabhi (All)";
        optAll.innerText = "Sabhi (All)";
        assigneeSelect.appendChild(optAll);
        
        appState.travelers.forEach(t => {
            const opt = document.createElement("option");
            opt.value = t.name;
            opt.innerText = t.name;
            assigneeSelect.appendChild(opt);
        });
    }
    
    // Attach Checklist filters listeners
    const filters = document.querySelectorAll("[data-packing-filter]");
    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            filters.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const filterValue = btn.getAttribute("data-packing-filter");
            renderPackingList(filterValue);
        });
    });
    
    // Attach Add Packing Item form submit handler
    const form = document.getElementById("add-packing-item-form");
    if (form) {
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        newForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById("packing-item-name");
            const catSelect = document.getElementById("packing-item-category");
            const assigneeSelect = document.getElementById("packing-item-assignee");
            
            const newItem = {
                id: "pack_" + Date.now(),
                name: nameInput.value.trim(),
                category: catSelect.value,
                assignee: assigneeSelect.value,
                checked: false
            };
            
            appState.packing.push(newItem);
            saveStateToLocalStorage();
            
            nameInput.value = "";
            
            // Re-render lists
            const activeFilter = document.querySelector("[data-packing-filter].active").getAttribute("data-packing-filter");
            renderPackingList(activeFilter);
            updateDashboardStats();
        });
    }
    
    renderPackingList("all");
}

function renderPackingList(filterType = "all") {
    const container = document.getElementById("checklist-items-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    const filteredItems = appState.packing.filter(item => {
        if (filterType === "all") return true;
        return item.category === filterType;
    });
    
    if (filteredItems.length === 0) {
        container.innerHTML = `<div class="settle-empty-state">Is category me koi packing items nahi hai. Naya add karein!</div>`;
        return;
    }
    
    filteredItems.forEach(item => {
        const li = document.createElement("li");
        li.className = `checklist-item ${item.checked ? 'checked' : ''}`;
        
        li.innerHTML = `
            <label class="checklist-chk-label" data-id="${item.id}">
                <div class="custom-checkbox">✓</div>
                <span class="checklist-item-text">${item.name}</span>
            </label>
            <div class="checklist-item-metadata">
                <span class="assignee-badge">👤 ${item.assignee}</span>
                <button class="btn-delete-item btn-delete-packing" data-id="${item.id}">🗑️</button>
            </div>
        `;
        
        container.appendChild(li);
    });
    
    // Attach checkbox toggle handlers
    document.querySelectorAll(".checklist-chk-label").forEach(lbl => {
        lbl.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent double triggering with labels
            const id = lbl.getAttribute("data-id");
            const index = appState.packing.findIndex(item => item.id === id);
            
            if (index !== -1) {
                appState.packing[index].checked = !appState.packing[index].checked;
                saveStateToLocalStorage();
                
                const activeFilter = document.querySelector("[data-packing-filter].active").getAttribute("data-packing-filter");
                renderPackingList(activeFilter);
                updateDashboardStats();
            }
        });
    });
    
    // Attach delete packing item handlers
    document.querySelectorAll(".btn-delete-packing").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            appState.packing = appState.packing.filter(item => item.id !== id);
            saveStateToLocalStorage();
            
            const activeFilter = document.querySelector("[data-packing-filter].active").getAttribute("data-packing-filter");
            renderPackingList(activeFilter);
            updateDashboardStats();
        });
    });
}

// 13. Sarkari Bus Finder Component
function initBusFinderComponent() {
    const filters = document.querySelectorAll("[data-bus-filter]");
    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            filters.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const filterValue = btn.getAttribute("data-bus-filter");
            renderBusRoutes(filterValue);
        });
    });
    
    renderBusRoutes("all");
}

function renderBusRoutes(filterType = "all") {
    const container = document.getElementById("bus-routes-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    const filtered = BUS_ROUTES_DB.filter(route => {
        if (filterType === "all") return true;
        return route.filter === filterType;
    });
    
    filtered.forEach(route => {
        const card = document.createElement("div");
        card.className = "bus-route-card";
        
        card.innerHTML = `
            <div class="route-header">
                <div class="route-badge-title">
                    <span class="bus-number-badge">${route.number}</span>
                    <span class="route-title">${route.type}</span>
                </div>
                <span class="route-pricing-badge">${route.fare}</span>
            </div>
            <div class="route-details-row">
                <div>
                    <p>🛣️ <strong>Route:</strong> ${route.from} ➔ ${route.to}</p>
                </div>
                <div>
                    <p>⚡ <strong>Saving:</strong> ${route.saves}</p>
                </div>
            </div>
            <div class="route-details-row">
                <div style="grid-column: span 2;">
                    <p>🕒 <strong>Schedule:</strong> ${route.timing}</p>
                </div>
            </div>
            <span class="route-stops-tagline">🛑 Stops: ${route.stops}</span>
        `;
        
        container.appendChild(card);
    });
}

// 14. Interactive Map Component (Leaflet.js integration)
function initMapComponent() {
    // Coordinate Bounds encompassing Bhubaneswar and Puri
    const defaultCenter = [20.10, 85.75]; // Centered between BBS and Puri
    const defaultZoom = 10;
    
    // Initialize map
    leafletMap = L.map('group-map', {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView(defaultCenter, defaultZoom);
    
    // Apply highly aesthetic premium dark mode custom map tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(leafletMap);
    
    // Setup initial pins state
    updateMapPins();
    
    // Handle Get My Location via Geolocation API
    const getLocBtn = document.getElementById("btn-get-my-location");
    getLocBtn.addEventListener("click", () => {
        getLocBtn.innerText = "⏳ Fetching GPS...";
        
        if (!navigator.geolocation) {
            alert("Safar-Sathi Error: Aapka browser ya mobile GPS support nahi karta.");
            getLocBtn.innerText = "📍 Update My Location";
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // Add your own coordinate to state
                appState.sharedLocations = appState.sharedLocations.filter(loc => loc.id !== 0); // remove previous self
                
                // Let's resolve the user's name dynamically
                const localUser = appState.travelers.find(t => t.id === "local-user");
                const customSelfName = (localUser && localUser.name !== "Aap (You)") ? localUser.name : "Aap (You)";
                
                appState.sharedLocations.push({
                    id: 0,
                    name: customSelfName,
                    lat: lat,
                    lng: lng,
                    place: "Current Active Location",
                    isGps: true
                });
                
                saveStateToLocalStorage();
                updateMapPins();
                
                // Proactive real-time map location sync to Firestore!
                if (db && activeGroupPin && currentUser) {
                    const travelerEntry = appState.travelers.find(t => t.id === currentUser.uid);
                    const nameToSync = travelerEntry ? travelerEntry.name : (currentUser.displayName || "Sathi");
                    
                    db.collection("groups").doc(activeGroupPin).update({
                        [`locations.${currentUser.uid}`]: {
                            name: nameToSync,
                            lat: lat,
                            lng: lng,
                            place: "Live GPS Pin",
                            timestamp: Date.now()
                        }
                    }).catch(err => {
                        console.error("Failed to sync live GPS pin: ", err);
                    });
                }
                
                // Center Map on self coordinates
                leafletMap.setView([lat, lng], 13);
                
                // Generate and update the Share Link
                generateShareLocationLink(lat, lng);
                
                getLocBtn.innerText = "📍 Update My Location";
                alert("Success: Aapki location map par plot ho gayi hai! Link generate ho gaya hai.");
            },
            (error) => {
                console.error(error);
                alert("GPS Error: Location read nahi ho saki. Please GPS permissions check karein.");
                getLocBtn.innerText = "📍 Update My Location";
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    });
    
    // Handle Demo Mode locations toggle
    const demoBtn = document.getElementById("btn-toggle-demo-locations");
    demoBtn.addEventListener("click", () => {
        isDemoLocationsActive = !isDemoLocationsActive;
        
        if (isDemoLocationsActive) {
            demoBtn.classList.remove("btn-accent");
            demoBtn.classList.add("btn-success");
            demoBtn.innerText = "🤖 Demo Mode: Active";
            plotDemoLocationsOnMap();
        } else {
            demoBtn.classList.remove("btn-success");
            demoBtn.classList.add("btn-accent");
            demoBtn.innerText = "🤖 Toggle Demo Mode";
            clearDemoMarkers();
        }
        
        updateActivePinsListDisplay();
    });
    
    // Copy Location shareable link button
    const copyLinkBtn = document.getElementById("btn-copy-location-link");
    copyLinkBtn.addEventListener("click", () => {
        const linkInput = document.getElementById("my-location-link");
        if (linkInput.value.includes("Pin your location")) {
            alert("Pehle 'Update My Location' button par click karke apni GPS location pin karein!");
            return;
        }
        
        linkInput.select();
        linkInput.setSelectionRange(0, 99999); // For mobile devices
        
        navigator.clipboard.writeText(linkInput.value)
            .then(() => {
                const prevText = copyLinkBtn.innerText;
                copyLinkBtn.innerText = "Copied!";
                copyLinkBtn.style.backgroundColor = "var(--color-success)";
                setTimeout(() => {
                    copyLinkBtn.innerText = prevText;
                    copyLinkBtn.style.backgroundColor = "";
                }, 2000);
            })
            .catch(err => {
                console.error("Could not copy text: ", err);
            });
    });
    
    // Friend Coordinate Import form submit
    const importForm = document.getElementById("friend-location-import-form");
    importForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputField = document.getElementById("input-import-location");
        const val = inputField.value.trim();
        
        if (!val) return;
        
        const success = importFriendLocationFromText(val);
        if (success) {
            inputField.value = "";
            updateMapPins();
            updateActivePinsListDisplay();
        } else {
            alert("Invalid Code/Link! Please check coordinate link is correct.");
        }
    });
    
    // Initial display list
    updateActivePinsListDisplay();
}

// 15. Helper for building Shareable Location Link
function generateShareLocationLink(lat, lng) {
    const base = window.location.origin + window.location.pathname;
    const shareUrl = `${base}?name=${encodeURIComponent(appState.travelers[0].name)}&lat=${lat}&lng=${lng}`;
    
    const linkInput = document.getElementById("my-location-link");
    if (linkInput) {
        linkInput.value = shareUrl;
    }
}

// 16. Parser for loading friend positions from URL params
function parseUrlLocationParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const lat = Number(urlParams.get('lat'));
    const lng = Number(urlParams.get('lng'));
    
    if (name && !isNaN(lat) && !isNaN(lng)) {
        // Prevent duplicate loads of same friend
        appState.sharedLocations = appState.sharedLocations.filter(loc => loc.name !== name);
        
        appState.sharedLocations.push({
            id: "friend_" + Date.now(),
            name: name,
            lat: lat,
            lng: lng,
            place: "Shared Live Coordinate",
            isGps: false
        });
        
        saveStateToLocalStorage();
        
        // Clean URL to prevent multiple duplicate popups on reload
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        
        alert(`🎉 Safar-Sathi Sync: Group Map me ${name} ki live coordinates successfuly add ho gayi hain!`);
        
        // Preset tab to map so they see it instantly!
        appState.activeTab = "tracker";
        
        setTimeout(() => {
            const navTrackerItem = document.querySelector("[data-tab='tracker']");
            if (navTrackerItem) navTrackerItem.click();
        }, 100);
    }
}

// 17. Import friend coordinates via text input box
function importFriendLocationFromText(text) {
    try {
        let name = "Dost";
        let lat = null;
        let lng = null;
        
        if (text.includes("?name=") || text.includes("&lat=")) {
            // It's a full URL
            const urlObj = new URL(text);
            const params = new URLSearchParams(urlObj.search);
            name = params.get('name') || "Dost";
            lat = Number(params.get('lat'));
            lng = Number(params.get('lng'));
        } else {
            // Format check: Name-Lat-Lng e.g. "Rahul-19.8-85.8"
            const parts = text.split("-");
            if (parts.length >= 3) {
                name = parts[0];
                lat = Number(parts[1]);
                lng = Number(parts[2]);
            }
        }
        
        if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
            appState.sharedLocations = appState.sharedLocations.filter(loc => loc.name !== name);
            appState.sharedLocations.push({
                id: "friend_" + Date.now(),
                name: name,
                lat: lat,
                lng: lng,
                place: "Imported Coordinate",
                isGps: false
            });
            saveStateToLocalStorage();
            alert(`Sathi Plotter: ${name} ki location successfully add ho gayi hai!`);
            return true;
        }
    } catch(e) {
        console.error("Import error: ", e);
    }
    return false;
}

// 18. Map Pins Rendering Engine
function updateMapPins() {
    if (!leafletMap) return;
    
    // Clear old state markers
    Object.keys(leafletMapMarkers).forEach(key => {
        // Only clear non-demo markers when updating regular state
        if (!key.startsWith("demo_")) {
            leafletMap.removeLayer(leafletMapMarkers[key]);
            delete leafletMapMarkers[key];
        }
    });
    
    // Plot all shared/GPS locations from state
    appState.sharedLocations.forEach(loc => {
        const markerId = `loc_${loc.id}`;
        
        // Custom div icon with violet pulse for GPS user and standard electric-blue for others
        const isSelf = loc.id === 0;
        const iconHtml = `
            <div class="map-pin-container ${isSelf ? 'my-gps-pin' : ''}">
                <div class="map-pin-pulse"></div>
                <div class="map-pin-circle">${loc.name.charAt(0).toUpperCase()}</div>
            </div>
        `;
        
        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-div-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
        
        const popupContent = `
            <div class="map-avatar-popup">
                <h4>${loc.name}</h4>
                <p>📍 ${loc.place}</p>
                <p class="small">Coords: ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}</p>
            </div>
        `;
        
        const marker = L.marker([loc.lat, loc.lng], { icon: customIcon })
            .bindPopup(popupContent)
            .addTo(leafletMap);
            
        leafletMapMarkers[markerId] = marker;
    });
}

// 19. Demo Coordinates & Simulation Toggle
const DEMO_LOCATIONS = [
    { nameKey: "Krishna", place: "Khurda Road Junction 🚂", lat: 20.1822, lng: 85.7876 },
    { nameKey: "Aditya", place: "Lingaraj Temple (Bhubaneswar) 🕉️", lat: 20.2382, lng: 85.8337 },
    { nameKey: "Rohit", place: "Puri Railway Station 🚉", lat: 19.8130, lng: 85.8315 },
    { nameKey: "Bhushan", place: "Golden Beach (Puri) 🌊", lat: 19.8008, lng: 85.8278 },
    { nameKey: "Vishal", place: "Anand Bazar (Jagannath Temple) 🍚", lat: 19.8049, lng: 85.8178 }
];

function plotDemoLocationsOnMap() {
    if (!leafletMap) return;
    
    // Clear old demo markers first
    clearDemoMarkers();
    
    // Plot new demo markers
    DEMO_LOCATIONS.forEach((demoLoc, index) => {
        // Resolve custom traveler name dynamically
        let displayName = demoLoc.nameKey;
        if (index < appState.travelers.length) {
            displayName = appState.travelers[index].name;
        }
        
        const markerId = `demo_${index}`;
        
        const iconHtml = `
            <div class="map-pin-container demo-pin">
                <div class="map-pin-pulse"></div>
                <div class="map-pin-circle">${displayName.charAt(0).toUpperCase()}</div>
            </div>
        `;
        
        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-div-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
        
        const popupContent = `
            <div class="map-avatar-popup">
                <h4>${displayName}</h4>
                <p>📍 ${demoLoc.place}</p>
                <p class="small">Status: Live Demo Pin</p>
            </div>
        `;
        
        const marker = L.marker([demoLoc.lat, demoLoc.lng], { icon: customIcon })
            .bindPopup(popupContent)
            .addTo(leafletMap);
            
        leafletMapMarkers[markerId] = marker;
    });
    
    // Fit bounds of the map to cover all demo markers
    const groupCoords = DEMO_LOCATIONS.map(d => [d.lat, d.lng]);
    leafletMap.fitBounds(groupCoords, { padding: [50, 50] });
}

function clearDemoMarkers() {
    if (!leafletMap) return;
    
    Object.keys(leafletMapMarkers).forEach(key => {
        if (key.startsWith("demo_")) {
            leafletMap.removeLayer(leafletMapMarkers[key]);
            delete leafletMapMarkers[key];
        }
    });
    
    // Reset view back to center if demo mode closed
    leafletMap.setView([20.10, 85.75], 10);
}

function updateActivePinsListDisplay() {
    const list = document.getElementById("active-markers-list");
    if (!list) return;
    
    list.innerHTML = "";
    
    // Add real locations
    appState.sharedLocations.forEach(loc => {
        const li = document.createElement("li");
        li.className = "pin-status-item";
        li.innerHTML = `
            <span class="pin-name">
                <span class="pin-indicator" style="background-color: #a78bfa;"></span>
                ${loc.name}
            </span>
            <span class="pin-loc">${loc.place}</span>
        `;
        list.appendChild(li);
    });
    
    // Add demo locations if active
    if (isDemoLocationsActive) {
        DEMO_LOCATIONS.forEach((d, idx) => {
            let displayName = d.nameKey;
            if (idx < appState.travelers.length) {
                displayName = appState.travelers[idx].name;
            }
            
            const li = document.createElement("li");
            li.className = "pin-status-item";
            li.innerHTML = `
                <span class="pin-name">
                    <span class="pin-indicator"></span>
                    ${displayName}
                </span>
                <span class="pin-loc">${d.place.split(" ")[0]}...</span>
            `;
            list.appendChild(li);
        });
    }
    
    if (list.children.length === 0) {
        list.innerHTML = `<li class="small text-muted" style="text-align:center; padding:0.5rem 0;">Koi pin active nahi hai. Demo mode toggle karein ya location check-in karein!</li>`;
    }
}

// ==========================================================================
// 20. Firebase Integration Core (Google Sign-In & Firestore Live Sync)
// ==========================================================================
let db = null;
let auth = null;
let currentUser = null;
let activeGroupPin = null;
let firestoreUnsubscribers = [];

const firebaseConfig = {
  apiKey: "AIzaSyBm9nWSojX73BcNLW8HoTWjY3qFO9pOjEM",
  authDomain: "safar-sathi-908bf.firebaseapp.com",
  projectId: "safar-sathi-908bf",
  storageBucket: "safar-sathi-908bf.firebasestorage.app",
  messagingSenderId: "665751827172",
  appId: "1:665751827172:web:a655708fe7844b291af2f1",
  measurementId: "G-RLJLMVNJR6"
};

// Initialize Firebase compatibility mode safely
try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        console.log("Firebase initialized successfully in compatibility mode!");
        
        // Listen to Auth State Changes
        auth.onAuthStateChanged((user) => {
            if (user) {
                currentUser = user;
                console.log("User logged in: ", user.displayName);
                
                // Show Group Actions
                toggleAuthUI("logged-in");
                
                // Auto-join group if PIN is saved in localStorage
                const savedPin = localStorage.getItem("safarsathi_group_pin");
                if (savedPin) {
                    joinGroup(savedPin);
                }
            } else {
                currentUser = null;
                activeGroupPin = null;
                toggleAuthUI("logged-out");
            }
        });
    } else {
        console.warn("Firebase SDK scripts not loaded. Operating in offline local storage mode.");
    }
} catch (e) {
    console.error("Firebase startup error: ", e);
}

function clearFirestoreListeners() {
    firestoreUnsubscribers.forEach(unsub => unsub());
    firestoreUnsubscribers = [];
}

function toggleAuthUI(state) {
    const authActions = document.getElementById("firebase-auth-actions");
    const groupActions = document.getElementById("firebase-group-actions");
    const activeDetails = document.getElementById("firebase-active-group-details");
    
    if (!authActions || !groupActions || !activeDetails) return;
    
    authActions.classList.add("hidden");
    groupActions.classList.add("hidden");
    activeDetails.classList.add("hidden");
    
    if (state === "logged-out") {
        authActions.classList.remove("hidden");
    } else if (state === "logged-in") {
        groupActions.classList.remove("hidden");
    } else if (state === "active-group") {
        activeDetails.classList.remove("hidden");
    }
}

// Function to attach click triggers to Firebase Authentication and Sync actions
function initFirebaseUI() {
    // 1. Google Login Click
    const loginBtn = document.getElementById("btn-google-login");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            if (!auth) {
                alert("Firebase connection not active. Offline local storage mode is running.");
                return;
            }
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider)
                .then((result) => {
                    console.log("Google Auth Success: ", result.user.displayName);
                })
                .catch((error) => {
                    console.error("Google Sign-In failed: ", error);
                    alert("Google Sign-In failed: " + error.message);
                });
        });
    }

    // 2. Google Logout Click
    const logoutBtn = document.getElementById("btn-google-logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            if (!auth) return;
            
            clearFirestoreListeners();
            auth.signOut().then(() => {
                currentUser = null;
                activeGroupPin = null;
                localStorage.removeItem("safarsathi_group_pin");
                
                // Reset app UI to local mode
                const statusBadge = document.getElementById("firebase-status-badge");
                if (statusBadge) {
                    statusBadge.innerText = "🔌 Offline / Local Mode";
                    statusBadge.style.backgroundColor = "var(--color-danger)";
                }
                
                const subtitle = document.getElementById("sync-subtitle");
                if (subtitle) {
                    subtitle.innerText = "Log in with Google to enable real-time tracking, expense sharing, and live group maps!";
                }
                
                toggleAuthUI("logged-out");
                
                // Load local storage values back
                loadStateFromLocalStorage();
                refreshAllUI();
                alert("Successfully Logged Out of Safar-Sathi Group!");
            });
        });
    }

    // 3. Create Group Click
    const createBtn = document.getElementById("btn-create-group");
    if (createBtn) {
        createBtn.addEventListener("click", () => {
            if (!db || !currentUser) return;
            
            createBtn.innerText = "⏳ Creating...";
            createBtn.disabled = true;
            
            // Generate a random 6-digit numeric PIN
            const pin = String(Math.floor(100000 + Math.random() * 900000));
            
            // Let's check if they have a customized local name
            const localUser = appState.travelers.find(t => t.id === "local-user");
            let nameToUse = currentUser.displayName || "Krishna";
            let roleToUse = "Organizer";
            
            if (localUser && localUser.name !== "Aap (You)") {
                nameToUse = localUser.name;
                roleToUse = localUser.role;
            }
            
            const groupData = {
                pin: pin,
                adminUid: currentUser.uid,
                adminName: currentUser.displayName,
                createdAt: Date.now(),
                travelers: [
                    { id: currentUser.uid, name: nameToUse, role: roleToUse }
                ],
                pnr: appState.pnr,
                itinerary: appState.itinerary,
                expenses: appState.expenses,
                packing: appState.packing,
                locations: {}
            };
            
            // Connection Safety Timeout to handle uncreated Firestore database instances in new Firebase projects
            const timeoutId = setTimeout(() => {
                if (createBtn.innerText === "⏳ Creating...") {
                    createBtn.innerText = "👑 Create Group (Admin)";
                    createBtn.disabled = false;
                    alert("Firestore Connection Alert: Safar-Sathi database se connect nahi ho pa raha hai!\n\nIski 2 main wajah ho sakti hain:\n1. Aapne apne Firebase Console (console.firebase.google.com) me 'Firestore Database' ko abhi tak CREATE/ENABLE nahi kiya hai.\n2. Aapke database ke 'Security Rules' read/write ko block kar rahe hain (Ise 'Test Mode' me start karein).\n\nPlease apne Firebase console par ja kar check karein!");
                }
            }, 6000);
            
            db.collection("groups").doc(pin).set(groupData)
                .then(() => {
                    clearTimeout(timeoutId);
                    console.log("Group created: ", pin);
                    createBtn.innerText = "👑 Create Group (Admin)";
                    createBtn.disabled = false;
                    joinGroup(pin);
                })
                .catch(err => {
                    clearTimeout(timeoutId);
                    console.error("Error creating group: ", err);
                    createBtn.innerText = "👑 Create Group (Admin)";
                    createBtn.disabled = false;
                    alert("Group creation failed: " + err.message);
                });
        });
    }

    // 4. Join Group Click
    const joinBtn = document.getElementById("btn-join-group");
    if (joinBtn) {
        joinBtn.addEventListener("click", () => {
            const pinInput = document.getElementById("input-group-pin");
            const pin = pinInput.value.trim();
            
            if (!pin || pin.length !== 6 || isNaN(pin)) {
                alert("Please enter a valid 6-Digit Group PIN!");
                return;
            }
            
            joinBtn.innerText = "⏳ Joining...";
            joinBtn.disabled = true;
            
            joinGroup(pin);
            
            // Reset loader states
            setTimeout(() => {
                joinBtn.innerText = "Join Group";
                joinBtn.disabled = false;
            }, 1000);
        });
    }
}

// Function to refresh all views in the app
function refreshAllUI() {
    renderTravelersPanel();
    initExpenseComponent();
    initPackingComponent();
    renderSelectedDayPlan();
    updateDashboardStats();
    updateMapPins();
    updateActivePinsListDisplay();
    syncSettingsInputs();
    updateFoodCalculatorFriendsText();
}

function joinGroup(pin) {
    if (!db || !currentUser) return;
    
    pin = String(pin).trim();
    
    db.collection("groups").doc(pin).get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Group found! Syncing: ", pin);
                listenToGroup(pin);
            } else {
                alert("Group PIN not found! Please check the code with the Admin.");
            }
        })
        .catch(err => {
            console.error("Error joining group: ", err);
            alert("Failed to join group: " + err.message);
        });
}

function listenToGroup(pin) {
    clearFirestoreListeners();
    activeGroupPin = pin;
    localStorage.setItem("safarsathi_group_pin", pin);
    
    const unsub = db.collection("groups").doc(pin).onSnapshot((doc) => {
        if (doc.exists) {
            const data = doc.data();
            
            // Sync state
            let dbTravelers = data.travelers || [];
            dbTravelers = syncUserToTravelersList(dbTravelers);
            appState.travelers = dbTravelers;
            appState.pnr = data.pnr || appState.pnr;
            appState.itinerary = data.itinerary || appState.itinerary;
            appState.expenses = data.expenses || appState.expenses;
            appState.packing = data.packing || appState.packing;
            
            // Sync locations map
            const fbLocations = data.locations || {};
            appState.sharedLocations = [];
            
            Object.keys(fbLocations).forEach(uid => {
                const loc = fbLocations[uid];
                appState.sharedLocations.push({
                    id: uid,
                    name: loc.name,
                    lat: loc.lat,
                    lng: loc.lng,
                    place: loc.place || "Group Live Pin",
                    isGps: uid === currentUser.uid
                });
            });
            
            refreshAllUI();
            
            // Update friend count badge on sync
            const badge = document.getElementById("friend-count-badge");
            if (badge) badge.innerText = `${appState.travelers.length} Travelers`;
            
            // UI Status Sync
            const statusBadge = document.getElementById("firebase-status-badge");
            if (statusBadge) {
                statusBadge.innerText = "⚡ Real-Time Connected";
                statusBadge.style.backgroundColor = "var(--color-success)";
            }
            
            const subtitle = document.getElementById("sync-subtitle");
            if (subtitle) {
                subtitle.innerText = "Group Live map, expenses, and checklists are syncing in real-time!";
            }
            
            const pinDisplay = document.getElementById("active-group-pin-display");
            if (pinDisplay) {
                pinDisplay.innerText = pin;
            }
            
            const userInfo = document.getElementById("user-display-info");
            if (userInfo) {
                userInfo.innerText = `Connected: ${currentUser.displayName}`;
            }
            
            toggleAuthUI("active-group");
        } else {
            console.warn("Group was deleted on server.");
            handleGoogleLogout();
        }
    }, (error) => {
        console.error("Firestore snapshot sync failed: ", error);
    });
    
    firestoreUnsubscribers.push(unsub);
}

// ==========================================================================
// 17. User auto-join and profile settings customizers
// ==========================================================================

function syncUserToTravelersList(travelersFromDb) {
    if (!currentUser || !activeGroupPin || !db) return travelersFromDb;
    
    const exists = travelersFromDb.some(t => t.id === currentUser.uid);
    if (!exists) {
        // Let's check if they have a customized local name
        const localUser = appState.travelers.find(t => t.id === "local-user");
        let nameToUse = currentUser.displayName || "Naya Sathi";
        let roleToUse = "Sathi";
        
        if (localUser && localUser.name !== "Aap (You)") {
            nameToUse = localUser.name;
            roleToUse = localUser.role;
        }
        
        const updated = [...travelersFromDb, {
            id: currentUser.uid,
            name: nameToUse,
            role: roleToUse
        }];
        
        // Write back to Firestore asynchronously
        db.collection("groups").doc(activeGroupPin).update({
            travelers: updated
        }).then(() => {
            console.log("Joined user auto-added to travelers");
        }).catch(err => {
            console.error("Failed to auto-add user to travelers: ", err);
        });
        
        return updated;
    }
    return travelersFromDb;
}

function initSettingsComponent() {
    const settingsForm = document.getElementById("settings-profile-form");
    const nameInput = document.getElementById("input-settings-username");
    const roleInput = document.getElementById("input-settings-userrole");
    
    if (settingsForm) {
        settingsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newName = nameInput.value.trim();
            const newRole = roleInput.value.trim() || "Sathi";
            
            if (!newName) {
                alert("Please enter a valid name!");
                return;
            }
            
            // Determine active user ID (either Google UID or "local-user")
            const activeId = (currentUser && activeGroupPin) ? currentUser.uid : "local-user";
            
            // Check if traveler already exists in appState.travelers
            let travelerIdx = appState.travelers.findIndex(t => t.id === activeId);
            if (travelerIdx !== -1) {
                appState.travelers[travelerIdx].name = newName;
                appState.travelers[travelerIdx].role = newRole;
            } else {
                appState.travelers.push({
                    id: activeId,
                    name: newName,
                    role: newRole
                });
            }
            
            // If online, also update currentUser.displayName locally for our app reference
            if (currentUser) {
                currentUser.displayName = newName;
                
                // Let's also update their location marker name if they have shared a location
                if (activeGroupPin && db) {
                    db.collection("groups").doc(activeGroupPin).get().then(doc => {
                        if (doc.exists) {
                            const data = doc.data();
                            const locations = data.locations || {};
                            if (locations[currentUser.uid]) {
                                locations[currentUser.uid].name = newName;
                                db.collection("groups").doc(activeGroupPin).update({
                                    locations: locations
                                });
                            }
                        }
                    });
                }
            }
            
            // Save state (local storage or Firestore)
            saveStateToLocalStorage();
            refreshAllUI();
            
            alert("Profile successfully updated!");
        });
    }
    
    // Reset local storage button
    const resetBtn = document.getElementById("btn-reset-local-storage");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (confirm("Kya aap sach me local data clear karna chahte hain? Sabhi packing lists aur expenses reset ho jayenge!")) {
                localStorage.clear();
                alert("Local data successfully cleared! Page reload ho raha hai.");
                window.location.reload();
            }
        });
    }

    // Call initial sync
    syncSettingsInputs();
}

function syncSettingsInputs() {
    const nameInput = document.getElementById("input-settings-username");
    const roleInput = document.getElementById("input-settings-userrole");
    
    if (nameInput && roleInput) {
        const activeId = (currentUser && activeGroupPin) ? currentUser.uid : "local-user";
        const traveler = appState.travelers.find(t => t.id === activeId);
        
        if (traveler) {
            nameInput.value = traveler.name;
            roleInput.value = traveler.role;
        } else {
            nameInput.value = currentUser ? (currentUser.displayName || "") : "Aap (You)";
            roleInput.value = currentUser ? "Sathi" : "Organizer";
        }
    }
    
    // Also update settings status box
    const syncStatus = document.getElementById("settings-sync-status");
    const groupPin = document.getElementById("settings-group-pin");
    const friendsCount = document.getElementById("settings-friends-count");
    
    if (syncStatus) {
        if (currentUser && activeGroupPin) {
            syncStatus.innerText = "⚡ Connected";
            syncStatus.style.color = "var(--color-success)";
        } else {
            syncStatus.innerText = "🔌 Offline / Local";
            syncStatus.style.color = "var(--color-danger)";
        }
    }
    
    if (groupPin) {
        groupPin.innerText = activeGroupPin ? activeGroupPin : "None";
    }
    
    if (friendsCount) {
        friendsCount.innerText = `${appState.travelers.length} Travelers`;
    }
}

// ==========================================================================
// 18. Odia Feast Dynamic Cost Estimator & Expenses Integrator
// ==========================================================================

function initFoodCalculatorComponent() {
    const inputs = document.querySelectorAll(".menu-qty-input");
    
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            recalculateFeastEstimates();
        });
    });
    
    const addExpenseBtn = document.getElementById("btn-add-food-to-expenses");
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener("click", () => {
            const total = calculateFeastTotal();
            if (total === 0) {
                alert("Pehle menu items me quantity select karein!");
                return;
            }
            
            // Get active user's customized profile name
            const activeId = (currentUser && activeGroupPin) ? currentUser.uid : "local-user";
            const traveler = appState.travelers.find(t => t.id === activeId);
            const activeName = traveler ? traveler.name : "Aap (You)";
            
            const nextId = appState.expenses.length > 0 ? Math.max(...appState.expenses.map(e => e.id)) + 1 : 1;
            appState.expenses.push({
                id: nextId,
                title: "Group Odia Feast (Calculator Split)",
                amount: total,
                category: "food",
                payer: activeName,
                date: new Date().toLocaleDateString('en-IN')
            });
            
            saveStateToLocalStorage();
            refreshAllUI();
            
            // Reset quantities to 0
            inputs.forEach(inp => inp.value = 0);
            recalculateFeastEstimates();
            
            alert(`🎉 Success: ₹${total} ka bill Hisab-Kitab me split ho chuka hai!`);
            
            // Switch to expenses tab
            const expTab = document.querySelector("[data-tab='expenses']");
            if (expTab) {
                expTab.click();
            }
        });
    }
    
    // Initial calculate
    recalculateFeastEstimates();
}

function calculateFeastTotal() {
    const inputs = document.querySelectorAll(".menu-qty-input");
    let total = 0;
    inputs.forEach(input => {
        const qty = parseInt(input.value) || 0;
        const price = parseInt(input.getAttribute("data-price")) || 0;
        total += (qty * price);
    });
    return total;
}

function recalculateFeastEstimates() {
    const total = calculateFeastTotal();
    const groupSize = Math.max(1, appState.travelers.length);
    const split = Math.round(total / groupSize);
    
    const totalEl = document.getElementById("food-calc-total");
    const splitEl = document.getElementById("food-calc-split");
    
    if (totalEl) totalEl.innerText = `₹${total}`;
    if (splitEl) splitEl.innerText = `₹${split} / head`;
    
    updateFoodCalculatorFriendsText();
}

function updateFoodCalculatorFriendsText() {
    const badge = document.getElementById("calc-friends-badge");
    const countText = document.getElementById("food-calc-friends");
    if (badge) badge.innerText = `${appState.travelers.length} Travelers`;
    if (countText) countText.innerText = `${appState.travelers.length} Travelers`;
}
