
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

    selected.classList.remove("bg-gray-200");
    selected.classList.add("bg-blue-600", "text-white");

    if (id === "open-btn") {
        allCardSection.classList.add("hidden");
        filteredSection.classList.remove("hidden");
    }
    else if (id === "all-btn") {
        allCardSection.classList.remove("hidden");
        filteredSection.classList.add("hidden");
    }
    else if (id === "closed-btn") {
        allCardSection.classList.add("hidden");
        filteredSection.classList.remove("hidden");
    }
}

// card count :

const allCount = document.getElementById("all-count");
const openCount = document.getElementById("open-count");
const closedCount = document.getElementById("closed-count");


// function createCard(item) {
//     return `
//     <div class="p-3 rounded shawdow" ${item.status === "open" ? "bg-green-100" : "bg-purple-100"}>
//            <span></span>
//     </div>
//     `
// }

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

    let openCount = 0;
    let closedCount = 0;

    for (let card of cards) {

        // card calculate:

        if (card.status === "open") openCount++;
        if (card.status === "closed") closedCount++;

        const div = document.createElement("div");

        div.innerHTML = `<div class="w-65 h-60 bg-white p-4 rounded-lg shadow border-t-2 ${card.status === "open" ? "bg-green-400" : "bg-purple-400"}">
        <span class="px-2 py-1 bg-gray-100 rounded text-sm
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