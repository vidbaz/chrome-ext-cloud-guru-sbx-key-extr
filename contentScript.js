function findLabelAndInputWithValue(labelText) {
  const labels = document.querySelectorAll('label');
  for (const label of labels) {
    if (label.textContent.trim() === labelText) {
      const input = label.parentElement.nextElementSibling.querySelector('input');
      if (input) {
        return input;
      }
    }
  }
  return null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCredentials') {
    const accessKeyInputElement = findLabelAndInputWithValue('Access Key Id');
    const secretKeyInputElement = findLabelAndInputWithValue('Secret Access Key');
    const awsAccessKeyId = accessKeyInputElement ? accessKeyInputElement.value : null;
    const awsSecretAccessKey = secretKeyInputElement ? secretKeyInputElement.value : null;
    sendResponse({ awsAccessKeyId, awsSecretAccessKey });
  }
});

// Fix for Chrome not running the sendResponse callback
chrome.runtime.connect({ name: 'dummyConnection' });
