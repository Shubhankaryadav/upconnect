// popup.js
document.addEventListener('DOMContentLoaded', function () {
    // Define variables for the UI elements
    const startLoggingButton = document.getElementById('start-logging');
    const stopLoggingButton = document.getElementById('stop-logging');
    const currentUrl = document.getElementById('current-url');
    const targetUrl = document.getElementById('target-url');
    const clickLog = document.getElementById('click-log');
    const rewardPointsElement = document.getElementById('reward-points');
    const resetPointsButton = document.getElementById('reset-points');

    // Set up a variable to track logging status
    let isLogging = false;
    let previousURL = ''; // Track the previous URL for changes

    // Function to update the UI with the current and target URLs
    function updateURLs(current, target) {
        currentUrl.textContent = current;
        targetUrl.textContent = target;
    }

    // Function to display click data in the popup
    function displayClickData(data) {
        clickLog.innerHTML = ''; // Clear the list
        data.forEach(function (item) {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.timestamp} - ${item.target} - ${item.text}`;
            clickLog.appendChild(listItem);
        });
    }

    // Function to update reward points in the UI
    function updateRewardPoints(points) {
        // Limit to three decimal places
        rewardPointsElement.textContent = points.toFixed(3);
    }

    // Function to handle the "Reset Points" button
    resetPointsButton.addEventListener('click', function () {
        chrome.runtime.sendMessage({ action: 'resetRewardPoints' }, function (points) {
            updateRewardPoints(points);
        });
    });

    // Initialize the reward points
    chrome.runtime.sendMessage({ action: 'getRewardPoints' }, function (points) {
        updateRewardPoints(points);
    });

    // Handle the "Start Logging" button click
    startLoggingButton.addEventListener('click', function () {
        isLogging = true;
        startLoggingButton.disabled = true;
        stopLoggingButton.disabled = false;
        chrome.runtime.sendMessage({ action: 'startLogging' });
    });

    // Handle the "Stop Logging" button click
    stopLoggingButton.addEventListener('click', function () {
        isLogging = false;
        startLoggingButton.disabled = false;
        stopLoggingButton.disabled = true;
        chrome.runtime.sendMessage({ action: 'stopLogging' });
    });

    // Function to check if the URL has changed and increment points
    function checkURLChange() {
        chrome.runtime.sendMessage({ action: 'getURLs' }, function (urls) {
            if (urls.currentURL !== previousURL) {
                previousURL = urls.currentURL; // Update previous URL
                if (urls.currentURL !== urls.targetURL) {
                    chrome.runtime.sendMessage({ action: 'incrementRewardPoints' }, function (points) {
                        updateRewardPoints(points);
                    });
                }
            }
        });
    }

    // Set an interval to continuously check for URL changes
    setInterval(checkURLChange, 1000); // Check every second

    // Call the updateUI function initially and at regular intervals
    function updateUI() {
        chrome.runtime.sendMessage({ action: 'getClickData' }, function (clickData) {
            displayClickData(clickData);
        });

        chrome.runtime.sendMessage({ action: 'getURLs' }, function (urls) {
            updateURLs(urls.currentURL, urls.targetURL);
        });
    }

    // Call the updateUI function initially
    updateUI();
});
