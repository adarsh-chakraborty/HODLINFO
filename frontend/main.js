const countDOM = document.querySelector('#count');
const coinTable = document.querySelector('#coinTable');
const selectControl = document.querySelector('#controls');
const selectOption2 = document.querySelector('#select2');
const buyBtn = document.querySelector('#buyBtn');

selectOption2.addEventListener('change', function () {
  buyBtn.textContent = `Buy ${selectOption2.value}`;
});

let count = 90;
setInterval(function () {
  if (count <= 0) {
    count = 90;
  }
  countDOM.textContent = count;
  count--;
}, 1000);

async function fetchData() {
  const response = await fetch('/api/coins');
  const data = await response.json();
  console.log(data);
  renderCoinTable(data);
  renderControls(data);
}

fetchData();

function renderControls(coins) {
  // Add new options for selectOption2
  let html = '';
  for (let coin of coins) {
    html += `<option class="dropdown-option" value="${coin.base_unit.toUpperCase()}">${coin.base_unit.toUpperCase()}</option>`;
  }
  selectOption2.innerHTML = html;
  buyBtn.textContent = `Buy ${selectOption2.value}`;

  selectControl.classList.remove('hidden');
}

function renderCoinTable(coins) {
  let html = '';
  let tableIndex = 0;
  for (let coin of coins) {
    html += `<tr>
    <td>${++tableIndex}</td>
    <td>${coin.name}</td>
    <td>${coin.last}</td>
    <td>₹${coin.buy}/₹${coin.sell}</td>
    <td>${coin.volume}</td>
    <td>${coin.base_unit}</td>
  </tr>`;
  }
  coinTable.innerHTML = html;
}
