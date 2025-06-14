import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'; // Importer les composants nécessaires
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as math from 'mathjs';
import initialHand from './src/main.js';

// Enregistrer les composants nécessaires
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

document.getElementById('compute-btn').addEventListener('click', () => {
  const spades = parseInt(document.getElementById('spades').value, 10);
  const clubs = parseInt(document.getElementById('clubs').value, 10);
  const diamonds = parseInt(document.getElementById('diamonds').value, 10);
  const hearts = parseInt(document.getElementById('hearts').value, 10);

  if (isNaN(spades) || isNaN(clubs) || isNaN(diamonds) || isNaN(hearts)) {
    alert('All fields must be filled.');
    return;
  }

  const total = spades + clubs + diamonds + hearts;
  if (total !== 10) {
    alert('The total number of cards must be 10.');
    return;
  }

  // Utilisation de la fonction main pour calculer les probabilités
  const probabilities = initialHand(spades, clubs, diamonds, hearts, math); // Passer math comme argument
  displayResults(probabilities);
});

document.getElementById('randomize-btn').addEventListener('click', () => {
  // Generate random numbers that sum to 10
  const randomNumbers = generateRandomNumbers(4, 10);

  // Update input fields with random numbers
  document.getElementById('spades').value = randomNumbers[0];
  document.getElementById('clubs').value = randomNumbers[1];
  document.getElementById('diamonds').value = randomNumbers[2];
  document.getElementById('hearts').value = randomNumbers[3];

  // Trigger compute with random values
  const probabilities = initialHand(
    randomNumbers[0],
    randomNumbers[1],
    randomNumbers[2],
    randomNumbers[3],
    math
  );
  displayResults(probabilities);
});

function generateRandomNumbers(count, total) {
  const numbers = Array(count).fill(0);
  let remaining = total;

  for (let i = 0; i < count - 1; i++) {
    const max = remaining - (count - i - 1); // Ensure enough space for remaining numbers
    numbers[i] = Math.floor(Math.random() * (max + 1));
    remaining -= numbers[i];
  }
  numbers[count - 1] = remaining; // Assign the remaining value to the last number

  // Shuffle the numbers for randomness
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
}

let chartInstance; // Declare a variable to hold the chart instance

function displayResults(probabilities) {
  // Save probabilities to localStorage
  localStorage.setItem('probabilities', JSON.stringify(probabilities));

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear the section and do not append probabilities

  const maxProbability = Math.max(...probabilities.map(prob => prob.probability));

  const ctx = document.getElementById('chart').getContext('2d');

  // Destroy the existing chart instance if it exists
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Create a new chart instance
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: probabilities.map(prob => prob.hand),
      datasets: [{
        label: 'Probability',
        data: probabilities.map(prob => prob.probability),
        backgroundColor: [
          '#000000', // Dark red for hearts
          '#000000', // Black for spades
          '#8B0000', // Dark red for diamonds
          '#8B0000'  // Black for clubs
        ],
        borderColor: [
          '#333333', // Darker red for hearts
          '#333333', // Darker black for spades
          '#5A0000', // Darker red for diamonds
          '#5A0000'  // Darker black for clubs
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false // Remove legend
        },
        tooltip: {
          enabled: true,
        },
        datalabels: {
          anchor: 'end',
          align: 'top',
          formatter: (value) => value.toFixed(2), // Format probability values
          font: {
            size: 10
          },
          padding: {
            top: 5 // Add padding above the bars to prevent overlap with the chart border
          }
        }
      },
      scales: {
        x: {
          barPercentage: 0.9, // Slightly reduce the bar width (default is 1.0)
        },
        y: {
          beginAtZero: true,
          max: maxProbability * 1.2, // Add 20% margin above the highest bar
          ticks: {
            callback: function(value) {
              return value.toFixed(1); // Round Y-axis labels to one decimal place
            }
          },
          title: {
            display: false
          }
        }
      }
    },
    plugins: [ChartDataLabels] // Add ChartDataLabels plugin
  });
}

// Page navigation
document.getElementById('hand-page-btn').addEventListener('click', () => {
  switchPage('hand');
});

document.getElementById('note-page-btn').addEventListener('click', () => {
  switchPage('note');
});

document.getElementById('chart-page-btn').addEventListener('click', () => {
  switchPage('chart');
});

function switchPage(page) {
  const handPage = document.getElementById('hand-page');
  const chartPage = document.getElementById('chart-page');
  const notePage = document.getElementById('note-page');
  const handBtn = document.getElementById('hand-page-btn');
  const chartBtn = document.getElementById('chart-page-btn');
  const noteBtn = document.getElementById('note-page-btn');

  if (page === 'hand') {
    handPage.classList.remove('hidden');
    chartPage.classList.add('hidden');
    notePage.classList.add('hidden');
    handBtn.classList.add('active');
    chartBtn.classList.remove('active');
    noteBtn.classList.remove('active');
  } else if (page === 'chart') {
    handPage.classList.add('hidden');
    chartPage.classList.remove('hidden');
    notePage.classList.add('hidden');
    handBtn.classList.remove('active');
    chartBtn.classList.add('active');
    noteBtn.classList.remove('active');
  } else if (page === 'note') {
    handPage.classList.add('hidden');
    chartPage.classList.add('hidden');
    notePage.classList.remove('hidden');
    handBtn.classList.remove('active');
    chartBtn.classList.remove('active');
    noteBtn.classList.add('active');
  }
}

// Note persistence
const noteArea = document.getElementById('note-area');
const clearNotesBtn = document.getElementById('clear-notes-btn');

// Load saved notes
noteArea.value = localStorage.getItem('notes') || '';

// Save notes on input
noteArea.addEventListener('input', () => {
  localStorage.setItem('notes', noteArea.value);
});

// Clear notes
clearNotesBtn.addEventListener('click', () => {
  noteArea.value = '';
  localStorage.removeItem('notes');
});

// Load saved inputs and probabilities on page load
document.addEventListener('DOMContentLoaded', () => {
  // Load saved inputs
  const savedInputs = JSON.parse(localStorage.getItem('handInputs')) || {};
  document.getElementById('spades').value = savedInputs.spades || 0;
  document.getElementById('clubs').value = savedInputs.clubs || 0;
  document.getElementById('diamonds').value = savedInputs.diamonds || 0;
  document.getElementById('hearts').value = savedInputs.hearts || 0;

  // Load saved probabilities
  const savedProbabilities = JSON.parse(localStorage.getItem('probabilities'));
  if (savedProbabilities) {
    displayResults(savedProbabilities);
  }
});

// Save inputs on change
['spades', 'clubs', 'diamonds', 'hearts'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    const inputs = {
      spades: parseInt(document.getElementById('spades').value, 10) || 0,
      clubs: parseInt(document.getElementById('clubs').value, 10) || 0,
      diamonds: parseInt(document.getElementById('diamonds').value, 10) || 0,
      hearts: parseInt(document.getElementById('hearts').value, 10) || 0,
    };
    localStorage.setItem('handInputs', JSON.stringify(inputs));
  });
});

// Mettre à jour l'état de la page Chart
function updateChartStatus(isActive) {
  console.log("HEHEHEHEHHEHEHEHEHEHEH!!!!!!!")
  const statusBox = document.getElementById("game-status");
  const transactionList = document.getElementById("transaction-list");

  if (isActive) {
    if (statusBox) statusBox.remove(); // Supprime la boîte de statut
    transactionList.classList.remove("hidden"); // Affiche la liste des transactions
  } else {
    if (!document.getElementById("game-status")) {
      // Récrée la boîte de statut si elle a été supprimée
      const newStatusBox = document.createElement("div");
      newStatusBox.id = "game-status";
      newStatusBox.className = "status-box";
      newStatusBox.textContent = "The trading pit is currently closed";
      transactionList.parentNode.insertBefore(newStatusBox, transactionList);
    }
    transactionList.classList.add("hidden"); // Masque la liste des transactions
  }
}

// Ajouter une transaction à la liste
function updateTransactions(transaction) {
  const transactionList = document.getElementById("transactions");
  const listItem = document.createElement("li");
  listItem.textContent = `Suite: ${transaction.suite}, Price: ${transaction.price}`;
  transactionList.appendChild(listItem);
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "GAME_STATUS") {
    updateChartStatus(message.isActive)
  }
});