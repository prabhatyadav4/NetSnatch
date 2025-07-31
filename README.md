# 🕵️‍♂️ NetSnatch

**NetSnatch** is a powerful, privacy-focused Chrome extension designed to detect, preview, and download files (images, documents, media, scripts, etc.) directly from your browser's **Network** activity — all without opening DevTools.

Whether you're a developer, designer, OSINT analyst, or just a curious internet user, NetSnatch gives you **deep visibility** into network resources and helps you **quickly extract** what you need.

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?logo=google-chrome)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)
![Manifest](https://img.shields.io/badge/Manifest-V3-red)

---

## 🌟 Features

### 📡 Real-time File Sniffing
- 🔍 Detects files on any webpage in real-time
- ⚡ Works by inspecting response headers using the `webRequest` API
- 🎯 Detects based on MIME types, not just file extensions
- 🌐 Supports all major file formats

### 📋 File Metadata Display
- 📄 **Filename** (auto-extracted from URL)
- 🏷️ **File type** (MIME or extension)
- 📏 **File size** (KB, MB, GB)
- ⏱️ **Load time** (in milliseconds)
- 📊 **Response headers** (detailed view on hover)

### 🖼️ Rich File Preview
- 🖼️ Image files (`JPG`, `PNG`, `SVG`, `WEBP`, `AVIF`, etc.) shown as **hover thumbnails**
- 🔍 Click to open full resolution preview in a new tab
- 📱 Responsive preview sizing

### 🧠 Advanced Filtering & Sorting
- 🔍 **Live Search**: Instantly filter files by keyword
- 🎯 **Type Dropdown**: Filter by specific file types (`.pdf`, `.zip`, `.mp4`, etc.)
- 🔢 **Sort by Columns**: Name, Type, Size, Load Time (ascending/descending)
- 🧹 **Smart Filtering**: Case-insensitive search

### 📥 Flexible Download Options
- ⬇️ **Individual Downloads**: Single-click file downloads
- ✅ **Bulk Downloads**: Select multiple files and download as ZIP
- ✏️ **File Renaming**: Rename files before downloading
- 📤 **URL Export**: Export selected URLs to `.txt` file
- 🗂️ **Organized Downloads**: Maintains original file structure

### 🛠️ Utility Tools
- ♻️ **Page Reload**: Refresh current page from popup
- 🧹 **Clear List**: Reset detected file list
- ❌ **Quick Close**: Close extension UI
- 💾 **Persistent State**: Files remain even after popup closes
- 🔄 **Auto-refresh**: Continuous monitoring mode

---

## 📦 Installation

### Option 1: Chrome Web Store
> 🚀 NetSnatch will be available on the [Chrome Web Store](https://chrome.google.com/webstore) once published.

### Option 2: Load Locally (Developer Mode)

1. **Clone or download this repository:**
   ```bash
   git clone https://github.com/yourusername/NetSnatch.git
   cd NetSnatch
   ```

2. **Open Chrome Extensions page:**
   - Navigate to `chrome://extensions/`
   - Or click Menu → More Tools → Extensions

3. **Enable Developer Mode:**
   - Toggle the "Developer mode" switch (top-right corner)

4. **Load the extension:**
   - Click "Load unpacked"
   - Select the NetSnatch project folder
   - The extension should now appear in your extensions list

5. **Pin to toolbar:**
   - Click the puzzle piece icon in Chrome toolbar
   - Pin NetSnatch for easy access

---

## 🚀 Usage Guide

### Getting Started
1. 🌐 **Visit any website** with downloadable resources
2. 🔍 **Click the NetSnatch extension icon** in your toolbar
3. 📡 **Files are detected automatically** and displayed in a sortable table

### Using the Interface
- 🔍 **Search Bar**: Filter files by name or type
- 🗂️ **Type Dropdown**: Filter by specific file extensions
- 🖼️ **Hover Preview**: Preview images by hovering over thumbnails
- ✅ **Selection**: Use checkboxes to select multiple files
- 📊 **Column Sorting**: Click column headers to sort data

### Download Options
- ⬇️ **Single Download**: Click download icon for individual files
- 📦 **Bulk Download**: Select multiple files and click "Download Selected"
- 🧾 **Export URLs**: Save selected file URLs to a text file
- ✏️ **Rename**: Double-click filename to rename before download

### Advanced Features
- 🧹 **Clear List**: Reset all detected files
- ♻️ **Reload Page**: Refresh current page and re-scan
- 💾 **Persistent Data**: Files persist between popup sessions
- 🔄 **Real-time Updates**: New files appear automatically

---

## 📁 Project Structure

```
NetSnatch/
├── 📄 manifest.json       # Chrome Extension manifest (MV3)
├── 🔧 background.js       # Network request interceptor & file detection
├── 🖼️ popup.html          # Main extension popup interface
├── ⚡ popup.js            # UI rendering, events, and file operations
├── 🎨 styles.css          # Custom styling and themes
├── 🖼️ icons/
│   ├── icon16.png         # 16x16 toolbar icon
│   ├── icon48.png         # 48x48 extension icon
│   └── icon128.png        # 128x128 store icon
├── 📚 README.md           # Project documentation
└── 📄 LICENSE             # MIT License
```

---

## 🔐 Privacy & Permissions

NetSnatch requires the following permissions to function:

| Permission | Purpose | Privacy Impact |
|------------|---------|----------------|
| `webRequest` | Monitor network requests | ✅ Local processing only |
| `webRequestBlocking` | Inspect response headers | ✅ No data transmission |
| `downloads` | Enable file downloads | ✅ Standard browser downloads |
| `storage` | Persist extension state | ✅ Local storage only |
| `activeTab` | Access current tab info | ✅ Current tab only |
| `<all_urls>` | Work on all websites | ✅ No data collection |

### 🛡️ Privacy Commitment
- **🔒 100% Client-Side**: All processing happens in your browser
- **🚫 No Data Collection**: We don't collect, store, or transmit your data
- **🔐 No External Servers**: No data leaves your device
- **🚫 No Tracking**: No analytics, cookies, or user tracking
- **🔓 Open Source**: Full transparency with public code

---

## 🧪 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|--------|
| ![Chrome](https://img.shields.io/badge/Chrome-✅-green) | Full Support | Primary target browser |
| ![Edge](https://img.shields.io/badge/Edge-✅-green) | Full Support | Chromium-based |
| ![Brave](https://img.shields.io/badge/Brave-✅-green) | Full Support | Chromium-based |
| ![Opera](https://img.shields.io/badge/Opera-⚡-yellow) | Partial Support | Some limitations |
| ![Firefox](https://img.shields.io/badge/Firefox-❌-red) | Not Supported | Different extension system |

*Requires Chromium-based browser with Manifest V3 support*

---

## 🛠️ Development

### Prerequisites
- Chrome Browser (v88+)
- Basic knowledge of JavaScript, HTML, CSS

### Local Development
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/NetSnatch.git
   cd NetSnatch
   ```

2. **Load extension in Chrome:**
   - Make changes to code
   - Click "Reload" button in chrome://extensions




## 🧑‍💻 Contributing

We welcome contributions of all kinds! Here's how you can help:

### 🚀 How to Contribute
1. **Fork this repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes:**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### 🎯 Areas for Contribution
- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **New Features**: Add requested functionality
- 🎨 **UI/UX**: Improve design and user experience  
- 📚 **Documentation**: Improve docs and examples
- 🔍 **Testing**: Add unit and integration tests
- 🌐 **Localization**: Add multi-language support

### 📋 Good First Issues
Check the [Issues](https://github.com/prabhatyadav4/NetSnatch/issues) tab for beginner-friendly tasks marked with `good first issue`.

---

## 🐛 Known Issues & Limitations

- ❌ **DRM Content**: Cannot download DRM-protected content (Netflix, Disney+, etc.)
- ❌ **Streaming Media**: Live streams not supported
- ⚠️ **Large Files**: Memory limitations for files >100MB
- ⚠️ **CORS**: Some files may be blocked by CORS policies
- ⚠️ **Rate Limits**: Some sites may rate-limit downloads

---



## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR**: You're free to use, modify, distribute, and even sell this software. Just include the original copyright notice.

---

## 🙋‍♂️ FAQ

### General Questions

**Q: Is NetSnatch safe to use?**
A: Yes! NetSnatch is 100% client-side with no data collection, tracking, or external communication.

**Q: Does it work on all websites?**
A: NetSnatch works on most websites, but some may block requests due to CORS policies or security measures.

**Q: Can it download YouTube videos?**
A: No. NetSnatch respects DRM and platform policies. It won't download protected streaming content.

### Technical Questions

**Q: Why do I need so many permissions?**
A: Each permission has a specific purpose for detecting and downloading files. We use the minimum required permissions.

**Q: Does it slow down my browser?**
A: NetSnatch has minimal performance impact and only processes requests when actively monitoring.

**Q: Can I use it in Incognito mode?**
A: Yes, but you need to enable "Allow in Incognito" in Chrome extensions settings.

---

## ✨ Credits & Acknowledgments

**NetSnatch** is crafted with 💻, ☕, and ❤️ by **Prabhat Kumar**


### Special Thanks
- Chrome Extensions community for documentation and examples
- Open source contributors who make projects like this possible
- Beta testers who provided valuable feedback

---

## 📬 Connect & Support

### 🌐 Find Me Online
- **GitHub**: [@prabhatyadav4](https://github.com/prabhatyadav4)
- **LinkedIn**: [Your Profile](www.linkedin.com/in/prabhat-kumar-95059531a)
- **Email**: [osrprabhatyadav4@gmail.com](osrprabhatydav4@gmail.com)

### 💬 Get Help
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/prabhatyadav4/NetSnatch/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/prabhatyadav4/NetSnatch/discussions)
- 📧 **Direct Contact**: [osrprabhatyadav4@gmail.com](mailto:osrprabhatyadav4@gmail.com)

### ⭐ Show Your Support
If NetSnatch helps you, consider:
- ⭐ **Starring** this repository
- 🐦 **Sharing** on social media
- 💰 **Sponsoring** development ([GitHub Sponsors](https://github.com/prabhatyadav4))
- ☕ **Buy me a coffee** ([Ko-fi](https://ko-fi.com/prabhatkumar))

---

<div align="center">

**Made with ❤️ for the developer community**

*NetSnatch - Because every file deserves to be found* 🕵️‍♂️

</div>
