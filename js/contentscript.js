// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'parseImg')) {
    // Collect the necessary data 
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var msgResp = "ok";
    try {
    var img = document.querySelectorAll("img");
    for(var i=0; i<img.length-1; i++){
       img[i].src = img[i].src && img[i].src.replace(/_\d+x\d+\.jpg.*/, ""); 
    }
       console.info(msgResp);
    } catch (e) { 
       msgResp = "Something Error!"; 
       console.error(msgResp);
    }

    // Directly respond to the sender (popup), 
    // through the specified callback */
    response(msgResp);
  }
});
