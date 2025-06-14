if (window.location.href === "https://www.figgie.com/play/") {
  console.log("Surveillance de la page Figgie Play activée.");

  let isGameActive = false; // Indique si une partie est active
  let transactions = []; // Stocke les transactions détectées

  // Fonction pour vérifier si une partie est active
  const checkGameStatus = () => {
    const timerElement = document.querySelector('.css-146c3p1');
    if (timerElement) {
      const timerText = timerElement.textContent.trim();
      const [minutes, seconds] = timerText.split(':').map(Number);

      // Vérifier si le timer est dans l'intervalle actif
      if ((minutes > 0 && minutes <= 4) || (minutes === 0 && seconds > 0)) {
        if (!isGameActive) {
          console.log("Début de partie détecté !");
          isGameActive = true;
          transactions = []; // Réinitialiser les transactions
          sendGameStatus(true);
          chrome.runtime.sendMessage({ type: "TRADING_PIT_STATUS", isOpen: true }); // Notifier popup.js
        }
      } else if (isGameActive) {
        console.log("Fin de partie détectée !");
        isGameActive = false;
        sendGameStatus(false);
        chrome.runtime.sendMessage({ type: "TRADING_PIT_STATUS", isOpen: false }); // Notifier popup.js
      }
    } else if (isGameActive) {
      console.log("Aucune partie en cours.");
      isGameActive = false;
      sendGameStatus(false);
      chrome.runtime.sendMessage({ type: "TRADING_PIT_STATUS", isOpen: false }); // Notifier popup.js
    }
  };

  // Fonction pour détecter les nouvelles transactions
  const detectTransactions = () => {
    if (!isGameActive) return;

    const transactionElements = document.querySelectorAll('.css-175oi2r > .css-175oi2r.r-12vffkv');
    transactionElements.forEach((element) => {
      const suiteElement = element.querySelector('svg path');
      const priceElement = element.querySelector('div[dir="auto"]:last-child');

      if (suiteElement && priceElement) {
        const suite = suiteElement.getAttribute('d'); // La suite est interprétée à partir du chemin SVG
        const price = priceElement.textContent.trim();

        // Vérifiez si la transaction est déjà enregistrée
        const transactionKey = `${suite}-${price}`;
        if (!transactions.includes(transactionKey)) {
          transactions.push(transactionKey);
          console.log("Nouvelle transaction détectée :", { suite, price });
          sendTransaction({ suite, price });
        }
      }
    });
  };

  // Fonction pour envoyer l'état de la partie à background.js
  const sendGameStatus = (status) => {
    chrome.runtime.sendMessage({ type: "GAME_STATUS", isActive: status });
  };

  // Fonction pour envoyer une transaction à background.js
  const sendTransaction = (transaction) => {
    chrome.runtime.sendMessage({ type: "NEW_TRANSACTION", transaction });
  };

  // Observer les changements dans le DOM
  const observer = new MutationObserver(() => {
    checkGameStatus();
    detectTransactions();
  });

  // Configurer l'observation sur le body
  observer.observe(document.body, { childList: true, subtree: true });

  // Vérifier immédiatement au cas où les conditions sont déjà remplies
  checkGameStatus();
}