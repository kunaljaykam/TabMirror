chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "duplicate-tab-found") {
        const userChoice = confirm("This tab is a duplicate. Would you like to close it?");
        if (userChoice) {
            console.log("User chose to close the other tab:", message.duplicateTabId); // Debug log
            chrome.runtime.sendMessage({ type: "close-tab", tabId: message.duplicateTabId });
        } else {
            console.log("User chose to keep the current tab:", sender.tab.id); // Debug log
        }
    }
});
