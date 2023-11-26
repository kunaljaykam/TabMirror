chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "duplicate-tab-found") {
        const userChoice = confirm("This tab is a duplicate. Would you like to close it?");
        if (userChoice) {
            // Close the current tab
            chrome.runtime.sendMessage({ type: "close-tab", tabId: sender.tab.id });
        } else {
            // Close the duplicate tab
            chrome.runtime.sendMessage({ type: "close-tab", tabId: message.duplicateTabId });
        }
    }
});
