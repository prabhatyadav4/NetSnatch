let detectedFiles = [];
const requestStartTimes = new Map();

const loadFilesFromStorage = () => {
  chrome.storage.local.get("detectedFiles", (data) => {
    if (data.detectedFiles) {
      detectedFiles = data.detectedFiles;
    }
  });
};
chrome.runtime.onInstalled.addListener(loadFilesFromStorage);
chrome.runtime.onStartup.addListener(loadFilesFromStorage);

chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: 680,
    height: 600,
  });
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    requestStartTimes.set(details.requestId, details.timeStamp);
  },
  { urls: ["<all_urls>"] }
);

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    const contentTypeHeader = details.responseHeaders.find(
      (header) => header.name.toLowerCase() === 'content-type'
    );

    if (contentTypeHeader) {
      const mimeType = contentTypeHeader.value.split(';')[0];
      const supportedMimeTypes = [
        'application/pdf', 'application/json', 'application/xml', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain', 'text/csv', 'text/css',
        'application/javascript', 'text/javascript', 'application/wasm',
        'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 
        'image/avif', 'image/bmp', 'image/x-icon', 'image/vnd.microsoft.icon',
        'video/mp4', 'video/webm', 'video/quicktime', 'audio/mpeg', 'audio/wav', 'audio/ogg',
        'font/woff', 'font/woff2', 'font/ttf', 'font/otf', 'application/vnd.ms-fontobject',
        'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed', 
        'application/gzip', 'application/x-tar'
      ];
      
      if (supportedMimeTypes.includes(mimeType)) {
        const sizeHeader = details.responseHeaders.find(h => h.name.toLowerCase() === 'content-length');
        const fileSize = sizeHeader ? parseInt(sizeHeader.value, 10) : 0;
        
        const startTime = requestStartTimes.get(details.requestId);
        const loadTime = startTime ? (details.timeStamp - startTime) : 0;

        const url = details.url;
        const fileName = url.split('/').pop().split('?')[0].split('#')[0] || 'download';
        const fileType = mimeType.split('/')[1].split('+')[0];

        const alreadyExists = detectedFiles.some(file => file.url === url);
        if (!alreadyExists) {
          detectedFiles.push({
            url,
            fileName,
            fileType,
            size: fileSize,
            loadTime: loadTime.toFixed(2)
          });
          chrome.storage.local.set({ detectedFiles });
        }
        requestStartTimes.delete(details.requestId);
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getFiles") {
    sendResponse(detectedFiles);
    return true;
  }
  if (request.action === "clearFiles") {
    detectedFiles = [];
    chrome.storage.local.set({ detectedFiles: [] }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});