chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "confirm-tab-close") {
        let messageText = message.isGrouped ? "Duplicate tab! Close and switch?" : "Duplicate tab! Close the other tab?";
        const userChoice = confirm(messageText);
        if (userChoice) {
            chrome.runtime.sendMessage({ 
                type: "close-tab", 
                tabToClose: message.tabToClose,
                tabToFocus: message.tabToFocus
            });
        }
    }
});

