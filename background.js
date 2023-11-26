chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        chrome.tabs.query({}, (tabs) => {
            const duplicates = tabs.filter(t => t.url === tab.url && t.id !== tabId);
            if (duplicates.length) {
                console.log("Duplicate tab found: ", duplicates[0].id, tabId); // Debug log
                chrome.tabs.sendMessage(tabId, { 
                    type: "duplicate-tab-found", 
                    duplicateTabId: duplicates[0].id 
                });
            }
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "close-tab") {
        console.log("Closing tab with ID:", message.tabId); // Debug log
        chrome.tabs.remove(message.tabId, () => {
            if (chrome.runtime.lastError) {
                console.error("Error removing tab: ", chrome.runtime.lastError.message);
            } else {
                console.log("Tab closed successfully."); // Debug log
            }
        });
    }
});
