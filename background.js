chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{

  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    chrome.scripting.insertCSS({
      target: {tabId: tabId},
      files: ["foreground_styles.css"]
    })
        .then(() => {
          chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["foreground.js"]
          })
              .then(() => {
                console.log("INJECTED");
              })


        })
        .catch(err => console.log(err));
  }
});
