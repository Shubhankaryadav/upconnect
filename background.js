// background.js

let clickData = [];
let isLogging = false;
let currentURL = '';
let targetURL = '';
let rewardPoints = 0;

chrome.runtime.onInstalled.addListener(() => {
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'logClick' && isLogging) {
        clickData.push(message.data);
    }

    if (message.action === 'getClickData') {
        sendResponse(clickData);
    }

    if (message.action === 'getURLs') {
        sendResponse({ currentURL, targetURL });
    }

    if (message.action === 'updateURLs') {
        currentURL = message.currentURL;
        targetURL = message.targetURL;
    }

    if (message.action === 'startLogging') {
        isLogging = true;
    }

    if (message.action === 'stopLogging') {
        isLogging = false;
    }

    if (message.action === 'getRewardPoints') {
        sendResponse(rewardPoints);
    }

    if (message.action === 'incrementRewardPoints') {
        rewardPoints += 0.1;
        chrome.storage.local.set({ rewardPoints: rewardPoints }, function () {
            if (chrome.runtime.lastError) {
                console.error('Error saving reward points:', chrome.runtime.lastError);
            }
        });
    }

    if (message.action === 'resetRewardPoints') {
        rewardPoints = 0;
        chrome.storage.local.set({ rewardPoints: rewardPoints }, function () {
            if (chrome.runtime.lastError) {
                console.error('Error resetting reward points:', chrome.runtime.lastError);
            }
        });
    }
});
