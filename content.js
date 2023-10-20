// content.js
function updateURLs() {
  chrome.runtime.sendMessage({
      action: 'updateURLs',
      currentURL: window.location.href,
      targetURL: (event.target.tagName === 'A') ? event.target.href : 'N/A',
  });
}

document.addEventListener('click', updateURLs);
window.addEventListener('load', updateURLs);
window.addEventListener('beforeunload', updateURLs);
