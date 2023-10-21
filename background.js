// background.js

//const { ethers } = require("ethers");
//const { Web3Provider } = require("@ethersproject/providers");
//const { getAddress } = require("ethers");


let isLogging = false;
// Initialize the reward points
let rewardPoints = 0;

chrome.runtime.onInstalled.addListener(() => {
    startLogging();
    // Initialize or load your data collection mechanism here
    // Load reward points from storage
    chrome.storage.local.get(['rewardPoints'], function (result) {
        if (!chrome.runtime.lastError) {
            rewardPoints = result.rewardPoints || 0;
        } else {
            console.error('Error loading reward points:', chrome.runtime.lastError);
        }
    });
});

function startLogging() {
    isLogging = true;
    // Additional setup or actions you want to perform when logging starts can be added here.
}
// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.adDetected) {
        // Increment reward points when an ad is detected
        rewardPoints++;
        // Save the updated points to storage
        chrome.storage.sync.set({ rewardPoints: rewardPoints }, () => {
            sendResponse({ rewardPointsUpdated: true });
        });
    }
});

// Retrieve the reward points from storage (initialization)
chrome.storage.sync.get(["rewardPoints"], (result) => {
    if (result.rewardPoints) {
        rewardPoints = result.rewardPoints;
    }
});
