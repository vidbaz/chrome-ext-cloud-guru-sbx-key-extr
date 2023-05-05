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

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getCredentials' }, (response) => {
      if (response) {
        document.getElementById('access-key-id').textContent = response.awsAccessKeyId || 'N/A';
        document.getElementById('secret-access-key').textContent = response.awsSecretAccessKey || 'N/A';
      }
    });
  });
});

document.getElementById('copy-credentials').addEventListener('click', () => {
  const awsAccessKeyId = document.getElementById('access-key-id').textContent;
  const awsSecretAccessKey = document.getElementById('secret-access-key').textContent;
  const formattedCredentials = `export AWS_DEFAULT_REGION=us-east-1\nexport AWS_ACCESS_KEY_ID=${awsAccessKeyId}\nexport AWS_SECRET_ACCESS_KEY=${awsSecretAccessKey}`;
  navigator.clipboard.writeText(formattedCredentials).then(() => {
    const copyMessage = document.getElementById('copy-message');
    copyMessage.style.display = 'inline';
    copyMessage.textContent = 'AWS credentials copied to clipboard.';
    setTimeout(() => {
      copyMessage.style.display = 'none';
    }, 2000);
  });
});

