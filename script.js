const apiUrl = 'https://restcountries.com/v3.1/all';
let loader = document.querySelector('#loader');
let select = document.querySelector('#region')
let searchInput = document.getElementById('filterInput'); 
let countriesData = []

async function fetchData(filterText = '') {
    loader.style.display = 'flex';
    try {
        const res = await fetch(apiUrl);
        countriesData = await res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    loader.style.display = 'none';
    displayItems()
}

function displayItems() {
    const filterText = searchInput.value.toLowerCase();
    const selectedRegion = select.value

    let filteredData= countriesData.filter(item => 
        item.name.common.toLowerCase().includes(filterText) &&
        (selectedRegion === 'all' || item.region === selectedRegion)
    )

    
    filteredData.sort((a, b) => a.region.localeCompare(b.region) || a.name.common.localeCompare(b.name.common));

    document.querySelector('.main__div').innerHTML = filteredData.map(item => `
        <div class="box">
            <img src="${item.flags.svg}" class="boximg" alt="Flag of ${item.name.common}">
            <h2 class="h2">${item.name.common}</h2>
            <p>${item.region}</p>
        </div>
    `).join('');
}

searchInput.addEventListener('input', displayItems);
select.addEventListener('change', displayItems);


document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.createElement("button");
    toggleSwitch.textContent = "🌙 Dark Mode";
    toggleSwitch.classList.add("toggle-btn");
    document.querySelector(".nav").appendChild(toggleSwitch);
    
    function toggleTheme() {
        document.body.classList.toggle("light-mode");
        if (document.body.classList.contains("light-mode")) {
            toggleSwitch.textContent = "☀️ Light Mode";
        } else {
            toggleSwitch.textContent = "🌙 Dark Mode";
        }
    }
    
    toggleSwitch.addEventListener("click", toggleTheme);
});


fetchData();
















// API curret counter Key API \\

// const url = 'https://currency-converter-pro1.p.rapidapi.com/latest-rates?base=USD';
// const options = {
//     method: 'GET',
//     headers: {
//         'x-rapidapi-key': 'd59dbd9747msh950a0d4f46aaf4bp188c12jsn11cf69907a27',
//         'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
//     }
// };

// const select = document.querySelector("select");
// const narx = document.querySelector("#narx"); 

// async function getdata() {
//     try {
//         const response = await fetch(url, options);
//         const res = await response.json();



//     } catch (error) {
//         console.error("Ошибка при получении данных:", error);
//     }
// }

// getdata();
