// popup.js
document.addEventListener('DOMContentLoaded', function () {
    // Define variables for the UI elements
    const stopLoggingButton = document.getElementById('stop-logging');
    const previousUrl = document.getElementById('previous-url');
    const currentUrl = document.getElementById('current-url');
    const clickLog = document.getElementById('click-log');
    const rewardPointsElement = document.getElementById('reward-points');
    const resetPointsButton = document.getElementById('reset-points');

    // Set up a variable to track logging status
    let isLogging = true;
    let previousURL = ''; // Track the previous URL for changes

    // Function to update the UI with the previous and current URLs
    function updateURLs(previous, current) {
        previousUrl.textContent = previous;
        currentUrl.textContent = current;
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
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return; // Handle the error, return, or do nothing as needed.
        }

        if (typeof points === 'number' && !isNaN(points)) {
            // Limit to three decimal places
            rewardPointsElement.textContent = points.toFixed(3);
        } else {
            console.error('Invalid points value:', points);
        }
    }

    // Function to handle the "Reset Points" button
    resetPointsButton.addEventListener('click', function () {
        chrome.runtime.sendMessage({ action: 'resetRewardPoints' }, function (points) {
            updateRewardPoints(points);
        });
    });

    // Initialize the reward points and handle undefined case
    let points = 0.0;
    chrome.runtime.sendMessage({ action: 'getRewardPoints' }, function (retrievedPoints) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return; // Handle the error, return, or do nothing as needed.
        }

        if (retrievedPoints !== undefined) {
            points = retrievedPoints;
        }
        updateRewardPoints(points);
    });

    // Handle the "Stop Logging" button click
    stopLoggingButton.addEventListener('click', function () {
        isLogging = false;
        stopLoggingButton.disabled = true;
        chrome.runtime.sendMessage({ action: 'stopLogging' });
    });

    // Function to check if the URL has changed and increment points
    function checkURLChange() {
        chrome.runtime.sendMessage({ action: 'getURLs' }, function (urls) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return; // Handle the error, return, or do nothing as needed.
            }

            if (urls.currentURL !== previousURL) {
                // Update both previous and current URLs
                updateURLs(previousURL, urls.currentURL);
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
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return; // Handle the error, return, or do nothing as needed.
            }

            displayClickData(clickData);
        });

        // Fetch the current URL from the active tab using chrome.tabs
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentTab = tabs[0];
            updateURLs(previousURL, currentTab.url);
        });
    }

    // Call the updateUI function initially
    updateUI();
});
