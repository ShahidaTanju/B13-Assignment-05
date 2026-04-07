
// for buttons:
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");


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

        const div = document.createElement("div");

        div.innerHTML = `<div class="w-65 h-60 bg-white p-4 rounded-lg shadow border-t-2 ">
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