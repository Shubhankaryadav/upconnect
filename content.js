// Define a regular expression pattern to match ad-related domains
var adPattern = /s0\.2mdn\.net|1-1ads\.com|101com\.com|.../;

// Define a function to detect ads on the page
function detectAds() {
  // Get all the elements on the page.
  var elements = document.querySelectorAll("*");

  // Create a counter to keep track of the number of ads.
  var adCount = 0;

  // Iterate over all the elements and check if they are ads.
  for (var i = 0; i < elements.length; i++) {
    if (adPattern.test(elements[i].classList)) {
      adCount++;
    }
  }

  // Reward the user with points equal to the number of ads detected
  rewardPoints(adCount);
}

// Function to reward the user with points
function rewardPoints(points) {
  // Send a message to the background script to update the points
  chrome.runtime.sendMessage({ adDetected: true, points: points }, (response) => {
    if (response.rewardPointsUpdated) {
      console.log(`Earned ${points} reward points!`);
    }
  });
}

// Run the ad detection function when the page loads
detectAds();

// You can listen for page changes if necessary
// For example, detect ads when the page is updated using the MutationObserver API
const observer = new MutationObserver(detectAds);

// Start observing DOM changes
observer.observe(document, { childList: true, subtree: true });
