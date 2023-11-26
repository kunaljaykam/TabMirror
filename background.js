chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        chrome.tabs.query({windowType: 'normal'}, (tabs) => {
            const duplicates = tabs.filter(t => t.url === tab.url && t.id !== tabId);
            if (duplicates.length) {
                try {
                    chrome.tabs.sendMessage(tabId, { 
                        type: "duplicate-tab-found", 
                        duplicateTabId: duplicates[0].id 
                    });
                } catch (error) {
                    console.error("Error sending message to tab: ", error);
                }
            }
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "close-tab") {
        chrome.tabs.remove(message.tabId, () => {
            if (chrome.runtime.lastError) {
                console.error("Error removing tab: ", chrome.runtime.lastError.message);
            }
        });
    }
});

