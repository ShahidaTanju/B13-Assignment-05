
// for buttons:
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

// button toggle :
let openList = [];
let closedList = [];
let currentStatus = "all";

const allFilterBtn = document.getElementById("all-btn");
const openFilterBtn = document.getElementById("open-btn");
const closedFilterBtn = document.getElementById("closed-btn");
const filteredSection = document.getElementById("filtered-section");
const allCardSection = document.getElementById("cardContainer");

function toggleStyle(id) {
    allFilterBtn.classList.remove("bg-blue-600", "text-white");
    openFilterBtn.classList.remove("bg-blue-600", "text-white");
    closedFilterBtn.classList.remove("bg-blue-600", "text-white");

    allFilterBtn.classList.add("bg-gray-200");
    openFilterBtn.classList.add("bg-gray-200");
    closedFilterBtn.classList.add("bg-gray-200");

    const selected = document.getElementById(id);
    currentStatus = id
    console.log(currentStatus);

    selected.classList.remove("bg-gray-200");
    selected.classList.add("bg-blue-600", "text-white");

    if (id === "all-btn") {
        loadCards();
    }

    else if (id === "open-btn") {
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
            .then(res => res.json())
            .then(data => {
                const openData = data.data.filter(card => card.status === "open");
                displayCards(openData);
            });
    }

    else if (id === "closed-btn") {
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
            .then(res => res.json())
            .then(data => {
                const closedData = data.data.filter(card => card.status === "closed");
                displayCards(closedData);
            });
    }
}



// card count :


// fetching data :

const loadCards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displayCards(data.data);
        });
};

const displayCards = (cards) => {
    const container = document.getElementById("cardContainer");
    container.innerHTML = "";

    for (let card of cards) {

        const borderColor = card.status === "open" ? "border-green-500" : card.status === "closed" ? "border-purple-500" : "border-gray-300";

        const div = document.createElement("div");

        div.innerHTML = `<div class="w-65 h-60 bg-white p-4 rounded-lg shadow border-t-4 ${borderColor}">
        <span class="px-2 py-1 rounded text-sm flex justify-end items-end
        ">${card.priority}</span>
        <h2 class="font-semibold text-sm mb-2">${card.title}</h2>
        
        <p class="text-xs text-gray-600 mb-3">${card.description}</p>
        <div>
    <div class=" gap-2">
        ${card.labels?.map(label =>
            `<span class="px-2 py-[3px] text-xs rounded-full">${label || "bg-gray-100 text-gay-600"}</span>`)}
    </div>
</div>
 <hr class="text-gray-300">

        <div class="flex justify-between items-center text-xs">
        <div class="flex justify-between text-xs text-gray-400 mt-1">
        <span>
        #${card.id}
        </span>
        <span>
        ${card.author}
        </span>
        </div>
        </div>
        <p class="text-xs text-gray-500 mt-3">${card.createdAt}</p>

        `
        container.appendChild(div);

    };
}
loadCards();

// modal :

function openModal(data) {
    const modal = document.getElementById("modal");
    const content = document.getElementById("modalContent");

    content.innerText = data;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closedModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}