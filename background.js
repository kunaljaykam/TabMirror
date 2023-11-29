chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        chrome.tabs.query({}, (tabs) => {
            const duplicates = tabs.filter(t => t.url === tab.url && t.id !== tabId);

            duplicates.forEach(duplicateTab => {
                let tabToClose = (duplicateTab.groupId === -1) ? duplicateTab.id : (tab.groupId === -1 ? tabId : (tabId < duplicateTab.id ? tabId : duplicateTab.id));
                let isGrouped = tab.groupId !== -1 || duplicateTab.groupId !== -1;

                chrome.tabs.sendMessage(tabId, {
                    type: "confirm-tab-close",
                    tabToClose: tabToClose,
                    tabToFocus: tabId,
                    isGrouped: isGrouped
                });
            });
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "close-tab") {
        chrome.tabs.remove(message.tabToClose, () => {
            if (!chrome.runtime.lastError) {
                chrome.tabs.update(message.tabToFocus, { active: true });
            }
        });
    }
});