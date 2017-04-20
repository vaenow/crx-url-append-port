function setDOMInfo(tabs, msgResp) {
  document.getElementById('check').innerHTML = msgResp.info || 'ok.';

  if (msgResp.url) {
    chrome.tabs.update(tabs[0].id, {
      url: msgResp.url
    });
  }

}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function() {
  document.getElementById('check').addEventListener('click', parseImg);
});

function parseImg() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    console.log(tabs);
    chrome.tabs.sendMessage(
      tabs[0].id, 
      {
        from: 'popup',
        subject: 'parseImg'
      },
      function(msgResp) {
        setDOMInfo(tabs, JSON.parse(msgResp))
      });
  });
}