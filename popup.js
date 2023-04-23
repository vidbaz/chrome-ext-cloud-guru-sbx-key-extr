document.getElementById('get-credentials').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getCredentials' }, (response) => {
      if (response) {
        document.getElementById('access-key-id').textContent = response.awsAccessKeyId || 'N/A';
        document.getElementById('secret-access-key').textContent = response.awsSecretAccessKey || 'N/A';
      }
    });
  });
});
