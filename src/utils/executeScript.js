/* eslint-disable no-undef */

const executeScript = (files, callback) => {
  try {
    chrome?.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const [currentTab] = tabs;

      if (!currentTab) return;

      chrome?.scripting?.executeScript(
        {
          target: { tabId: currentTab.id },
          files,
        },
        callback
      );
    });
  } catch (err) {
    console.error(err);
  }
};

export default executeScript;
