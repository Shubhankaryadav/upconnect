document.addEventListener('DOMContentLoaded', function () {
    const currentUrl = document.getElementById('current-url');
    const rewardPointsElement = document.getElementById('reward-points');

    let previousURL = ''; // Track the previous URL for changes

    // Function to update the UI with the current URL
    function updateCurrentURL(current) {
        currentUrl.textContent = `Current URL: ${current}`;
    }

    // Function to update reward points in the UI
    function updateRewardPoints(points) {
        if (typeof points === 'number' && !isNaN(points)) {
            rewardPointsElement.textContent = `Reward Points: ${points.toFixed(3)}`;
        }
    }

    // Function to check if the URL has changed and increment points
    function checkURLChange() {
        chrome.runtime.sendMessage({ action: 'getURLs' }, function (urls) {
            if (chrome.runtime.lastError) {
                console.error('Error getting URL data:', chrome.runtime.lastError);
            } else {
                if (urls.currentURL !== previousURL) {
                    updateCurrentURL(urls.currentURL);
                    previousURL = urls.currentURL;
                    if (urls.currentURL !== urls.targetURL) {
                        chrome.runtime.sendMessage({ action: 'incrementRewardPoints' }, function (points) {
                            if (chrome.runtime.lastError) {
                                console.error('Error incrementing reward points:', chrome.runtime.lastError);
                            } else {
                                updateRewardPoints(points);
                            }
                        });
                    }
                }
            }
        });
    }

    // Set an interval to continuously check for URL changes
    setInterval(checkURLChange, 1000);

    // Call the updateUI function initially
    function updateUI() {
        // Fetch the current URL from the active tab using chrome.tabs
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (chrome.runtime.lastError) {
                console.error('Error querying active tab:', chrome.runtime.lastError);
            } else {
                const currentTab = tabs[0];
                updateCurrentURL(currentTab.url);
            }
        });
    }

    // Call the updateUI function initially
    updateUI();
});
