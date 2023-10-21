// popup.js
//const { ethers } = require("ethers");
//const { Web3Provider } = require("@ethersproject/providers");
//const { getAddress } = require("ethers");
// Function to update the dashboard with reward points data


function updateDashboard() {
    chrome.storage.sync.get(["rewardPoints"], (result) => {
        const rewardPoints = result.rewardPoints || 0;

        // Update the dashboard elements
        document.getElementById("adCount").textContent = rewardPoints;
        document.getElementById("rewardPoints").textContent = rewardPoints;
        document.getElementById("pointsToday").textContent = rewardPoints;
        // You can implement points earned today logic here
    });
}

// Reset button click event
document.getElementById("resetButton").addEventListener("click", () => {
    // Reset reward points
    chrome.storage.sync.set({ rewardPoints: 0 }, () => {
        updateDashboard();
    });
});

// Initialize the dashboard when the popup is loaded
updateDashboard();
