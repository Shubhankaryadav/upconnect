// content.js

// Function to update the URLs and send them to the background script
function updateURLs() {
  chrome.runtime.sendMessage({
    action: 'updateURLs',
    currentURL: window.location.href,
    targetURL: (event.target.tagName === 'A') ? event.target.href : 'N/A',
  });
}

// Listen for user clicks and page load events
document.addEventListener('click', updateURLs);
window.addEventListener('load', updateURLs);

// Note: The 'beforeunload' event listener is removed as it's not necessary for tracking URL changes.
