
// Update the relevant fields with the new data
function setDOMInfo(info) {
  document.getElementById('check').innerHTML = "ok";
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  document.getElementById('check').addEventListener('click', parseImg);
});

function parseImg () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
	console.log(tabs);
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'parseImg'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script)
        setDOMInfo);
  });
}



