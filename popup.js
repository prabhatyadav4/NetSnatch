let allFiles = [];
let currentSearchQuery = '';
let currentTypeFilter = 'all';
let currentSort = { key: 'loadTime', direction: 'desc' };

// NEW: Get a reference to the preview popup element
const imagePreviewPopup = document.getElementById('image-preview-popup');

document.addEventListener("DOMContentLoaded", () => {
  initialize();
  checkTabStatus();
});

function initialize() {
    document.getElementById("downloadSelected").addEventListener("click", downloadSelectedFiles);
    document.getElementById("selectAll").addEventListener("change", toggleSelectAll);
    document.getElementById("clearFiles").addEventListener("click", clearAllFiles);
    document.getElementById("closeBtn").addEventListener("click", () => window.close());
    document.getElementById("reloadBtn").addEventListener("click", reloadCurrentTab);
    document.getElementById("exportUrlsBtn").addEventListener("click", exportUrls);

    document.getElementById("searchInput").addEventListener("input", handleSearch);
    document.getElementById("typeFilter").addEventListener("change", handleTypeFilter);

    const fileList = document.getElementById("fileList");
    fileList.addEventListener("click", handleFileAction);
    fileList.addEventListener("input", handleFilenameChange);
    
    // NEW: Add mouseover/mouseout listeners for hover preview
    fileList.addEventListener("mouseover", handlePreviewHover);
    fileList.addEventListener("mouseout", handlePreviewLeave);

    document.querySelector("#fileTable thead").addEventListener("click", handleSort);
    
    loadFiles();
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status) {
        checkTabStatus();
        loadFiles();
    }
});

function checkTabStatus() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (tabs[0]) {
      const pageIsLoading = tabs[0].status === 'loading';
      document.querySelectorAll('.action-btn, #downloadSelected, #searchInput, #typeFilter').forEach(btn => btn.disabled = pageIsLoading);
      const statusMessage = document.getElementById('statusMessage');
      if (pageIsLoading) {
        statusMessage.textContent = 'Current page is loading, please wait... ⏳';
        statusMessage.style.display = 'block';
        document.getElementById('fileTable').style.display = 'none';
      }
    }
  });
}

function loadFiles() {
  chrome.runtime.sendMessage({ action: "getFiles" }, (files) => {
    allFiles = (files || []).map(file => ({ ...file, currentFileName: file.fileName }));
    populateTypeFilter();
    renderFileList();
  });
}

function renderFileList() {
    const fileList = document.getElementById("fileList");
    const statusMessage = document.getElementById('statusMessage');
    const fileTable = document.getElementById('fileTable');
    fileList.innerHTML = "";

    let filesToRender = allFiles;

    if (currentTypeFilter !== 'all') {
        filesToRender = filesToRender.filter(file => file.fileType === currentTypeFilter);
    }
    if (currentSearchQuery) {
        filesToRender = filesToRender.filter(file => 
            file.currentFileName.toLowerCase().includes(currentSearchQuery.toLowerCase())
        );
    }

    filesToRender.sort((a, b) => {
        let valA = a[currentSort.key];
        let valB = b[currentSort.key];
        if (currentSort.key === 'size' || currentSort.key === 'loadTime') {
            valA = parseFloat(valA) || 0;
            valB = parseFloat(valB) || 0;
        } else {
            valA = (valA || '').toString().toLowerCase();
            valB = (valB || '').toString().toLowerCase();
        }

        if (valA < valB) return currentSort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return currentSort.direction === 'asc' ? 1 : -1;
        return 0;
    });

    if (filesToRender.length === 0) {
      statusMessage.textContent = allFiles.length === 0 ? 'No files detected yet.' : 'No files match your filter.';
      statusMessage.style.display = 'block';
      fileTable.style.display = 'none';
    } else {
      statusMessage.style.display = 'none';
      fileTable.style.display = 'table';
      checkTabStatus();
      filesToRender.forEach((file) => {
        const row = document.createElement("tr");
        const sizeText = file.size > 0 ? formatBytes(file.size) : 'N/A';
        const timeText = file.loadTime > 0 ? `${file.loadTime} ms` : 'N/A';
        
        // NEW: Check if file type is visual for hover preview
        const isVisual = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg', 'avif', 'icon'].includes(file.fileType);
        const previewButtonData = isVisual ? `data-is-visual="true"` : '';

        row.innerHTML = `
          <td><input type="checkbox" class="fileCheckbox" data-url="${file.url}" /></td>
          <td><input type="text" class="filename-input" data-url="${file.url}" value="${file.currentFileName}" /></td>
          <td>${file.fileType}</td>
          <td>${sizeText}</td>
          <td>${timeText}</td>
          <td><button class="action-btn preview-btn" data-url="${file.url}" ${previewButtonData} title="Preview">🔍</button></td>
          <td><button class="action-btn download-btn" data-url="${file.url}" title="Download">⬇️</button></td>
        `;
        fileList.appendChild(row);
      });
    }

    updateSortArrows();
}

// --- NEW FEATURE FUNCTIONS for Hover Preview ---
function handlePreviewHover(event) {
    const target = event.target.closest(".preview-btn");
    if (target && target.dataset.isVisual === 'true') {
        imagePreviewPopup.src = target.dataset.url;
        imagePreviewPopup.style.display = 'block';
        document.addEventListener('mousemove', movePreviewPopup);
    }
}

function handlePreviewLeave(event) {
    const target = event.target.closest(".preview-btn");
    if (target && target.dataset.isVisual === 'true') {
        imagePreviewPopup.style.display = 'none';
        imagePreviewPopup.src = ''; // Clear src to stop loading
        document.removeEventListener('mousemove', movePreviewPopup);
    }
}

function movePreviewPopup(e) {
    // Position the popup slightly to the right and below the cursor
    imagePreviewPopup.style.left = e.pageX + 15 + 'px';
    imagePreviewPopup.style.top = e.pageY + 15 + 'px';
}


// --- All other functions ---
function handleSort(event) {
    const target = event.target.closest('.sortable');
    if (!target) return;

    const sortKey = target.dataset.sort;
    if (currentSort.key === sortKey) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.key = sortKey;
        currentSort.direction = 'asc';
    }
    renderFileList();
}

function updateSortArrows() {
    document.querySelectorAll('th.sortable .sort-arrow').forEach(arrow => {
        arrow.textContent = '';
    });

    const activeHeader = document.querySelector(`th[data-sort="${currentSort.key}"]`);
    if (activeHeader) {
        const arrow = activeHeader.querySelector('.sort-arrow');
        arrow.textContent = currentSort.direction === 'asc' ? '↑' : '↓';
    }
}

function handleSearch(event) {
    currentSearchQuery = event.target.value;
    renderFileList();
}

function handleTypeFilter(event) {
    currentTypeFilter = event.target.value;
    renderFileList();
}

function populateTypeFilter() {
    const typeFilter = document.getElementById('typeFilter');
    const existingTypes = new Set(Array.from(typeFilter.options).map(o => o.value));
    
    const newTypes = new Set(allFiles.map(file => file.fileType));
    
    newTypes.forEach(type => {
        if (!existingTypes.has(type)) {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeFilter.appendChild(option);
        }
    });
}

function handleFilenameChange(event) {
    const target = event.target;
    if (target.classList.contains('filename-input')) {
        const url = target.dataset.url;
        const fileToUpdate = allFiles.find(f => f.url === url);
        if (fileToUpdate) {
            fileToUpdate.currentFileName = target.value;
        }
    }
}

function exportUrls() {
    const selectedCheckboxes = document.querySelectorAll(".fileCheckbox:checked");
    if (selectedCheckboxes.length === 0) {
        alert("Please select files to export their URLs.");
        return;
    }
    const urls = Array.from(selectedCheckboxes).map(cb => cb.dataset.url).join('\n');
    const blob = new Blob([urls], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NetSnatch_URLs.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function handleFileAction(event) {
  const target = event.target.closest("button.action-btn");
  if (!target || target.disabled) return;
  const url = target.dataset.url;
  if (!url) return;
  const file = allFiles.find(f => f.url === url);
  if (!file) return;
  if (target.classList.contains("preview-btn")) {
      chrome.tabs.create({ url: url });
  }
  if (target.classList.contains("download-btn")) {
    chrome.downloads.download({ url: url, filename: file.currentFileName });
  }
}

function downloadSelectedFiles() {
  const checkboxes = document.querySelectorAll(".fileCheckbox:checked");
  checkboxes.forEach(cb => {
    const url = cb.dataset.url;
    const file = allFiles.find(f => f.url === url);
    if(file) {
        chrome.downloads.download({ url: url, filename: file.currentFileName });
    }
  });
}

function reloadCurrentTab() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (tabs[0]) chrome.tabs.reload(tabs[0].id);
    });
}
function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
function toggleSelectAll(event) {
  const checkboxes = document.querySelectorAll(".fileCheckbox");
  checkboxes.forEach(cb => cb.checked = event.target.checked);
}
function clearAllFiles() {
  chrome.runtime.sendMessage({ action: "clearFiles" }, () => {
    allFiles = [];
    renderFileList();
  });
}