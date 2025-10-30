# 🚀 Crop Rotation Hub - Complete Setup Guide

This guide provides multiple ways to set up and run the Crop Rotation Hub website in VS Code and other environments.

## 📋 Prerequisites

Before you start, make sure you have:
- **VS Code** installed ([Download here](https://code.visualstudio.com/))
- **Modern web browser** (Chrome, Firefox, Safari, or Edge)
- **Internet connection** (for CDN resources)

## 🎯 Method 1: VS Code + Live Server (Recommended)

### Step 1: Install Live Server Extension
1. Open VS Code
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
3. Search for "Live Server"
4. Install the extension by **Ritwick Dey**

### Step 2: Open Project
1. Download/extract all project files to a folder
2. Open VS Code
3. Go to **File > Open Folder**
4. Select your project folder

### Step 3: Launch Website
1. Right-click on `index.html`
2. Select **"Open with Live Server"**
3. Website opens automatically in your browser
4. URL: `http://127.0.0.1:5500`

✅ **Advantages:**
- Auto-refresh on file changes
- Mobile device testing
- Easy development workflow

---

## 🌐 Method 2: Direct Browser Opening

### Quick Start
1. Navigate to your project folder
2. Double-click `index.html`
3. Website opens in your default browser

⚠️ **Note:** Some features may have limitations due to CORS restrictions.

---

## ⚡ Method 3: Node.js Server (Advanced)

### Prerequisites
- **Node.js** installed ([Download here](https://nodejs.org/))

### Setup
```bash
# Navigate to project folder
cd crop-rotation-website

# Install dependencies
npm install express

# Start server
npm start
```

### Access
- Open browser: `http://localhost:3000`
- For mobile testing: `http://YOUR_IP_ADDRESS:3000`

✅ **Advantages:**
- Professional server environment
- API endpoints ready for backend integration
- Better mobile testing capabilities

---

## 📱 Method 4: Mobile Testing

### With Live Server
1. Start Live Server in VS Code
2. Find your computer's IP address:
   - **Windows:** `ipconfig` in Command Prompt
   - **Mac/Linux:** `ifconfig` in Terminal
3. On mobile browser: `http://YOUR_IP:5500`

### With Node.js Server
1. Start the Node.js server: `npm start`
2. On mobile browser: `http://YOUR_IP:3000`

---

## 🔧 Development Workflow

### Recommended VS Code Extensions
```bash
# Essential Extensions
- Live Server (Ritwick Dey)
- Prettier - Code formatter
- Auto Rename Tag
- CSS Peek
- JavaScript (ES6) code snippets
- HTML CSS Support

# Optional but Helpful
- Bracket Pair Colorizer
- Path Intellisense
- GitLens
```

### File Organization
```
crop-rotation-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS and animations
├── script.js           # JavaScript and 3D code
├── server.js           # Node.js server (optional)
├── package.json        # Project configuration
├── README.md           # Documentation
├── SETUP_GUIDE.md      # This file
└── .gitignore          # Git ignore file
```

### Development Tips
1. **Live Reload:** Use Live Server for instant preview
2. **Code Formatting:** Install Prettier for consistent code style
3. **Browser DevTools:** Press F12 for debugging
4. **Console Monitoring:** Watch for JavaScript errors
5. **Mobile Testing:** Use device simulator in browser DevTools

---

## 🎨 Customization Guide

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-green: #2D5A27;      /* Main green color */
    --secondary-green: #4A7C59;    /* Secondary green */
    --accent-green: #8BC34A;       /* Accent highlights */
    --light-green: #C8E6C9;        /* Light backgrounds */
}
```

### Updating Content
1. **Text Content:** Edit directly in `index.html`
2. **Images:** Replace placeholder content
3. **Statistics:** Update `data-count` attributes
4. **Team Members:** Modify team section HTML

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding CSS in `styles.css`
3. Add JavaScript functionality in `script.js`
4. Update navigation menu

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 3D Animations Not Working
**Problem:** Black screens or missing 3D elements
**Solution:**
- Check internet connection (Three.js CDN)
- Verify browser supports WebGL
- Open DevTools console for error messages
- Try in different browser

#### Live Server Not Working
**Problem:** Cannot start Live Server
**Solution:**
- Restart VS Code
- Check if extension is enabled
- Try different port (5501, 5502, etc.)
- Disable firewall temporarily

#### Mobile Performance Issues
**Problem:** Slow loading on mobile
**Solution:**
- Automatic optimization is built-in
- Clear browser cache
- Check internet connection
- Some 3D features disabled on mobile

#### JavaScript Errors
**Problem:** Console showing errors
**Solution:**
- Check all file names match exactly
- Ensure all files are in same directory
- Verify CDN links are working
- Refresh browser cache (Ctrl+F5)

### Performance Optimization
- Use modern browser for best performance
- Close other applications to free up memory
- Disable browser extensions if causing issues
- Use incognito mode for testing

---

## 🌍 Deployment Options

### GitHub Pages (Free)
1. Create GitHub repository
2. Upload all project files
3. Enable GitHub Pages in settings
4. Access: `https://yourusername.github.io/repo-name`

### Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag project folder to deploy area
3. Get instant live URL
4. Custom domain support available

### Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Connect GitHub repository
3. Auto-deployment on git push
4. Professional features available

### Traditional Web Hosting
1. Upload files via FTP/cPanel
2. Ensure proper file permissions
3. Test all features work online

---

## 📊 Performance Monitoring

### Loading Speed
- Use browser DevTools Network tab
- Optimize images if needed
- Monitor CDN resource loading

### 3D Performance
- Check FPS in browser console
- Adjust 3D complexity if needed
- Monitor memory usage

### Mobile Optimization
- Test on actual mobile devices
- Use browser device simulator
- Check touch interactions

---

## 🤝 Getting Help

### Resources
- **Browser DevTools:** F12 for debugging
- **VS Code Documentation:** [code.visualstudio.com/docs](https://code.visualstudio.com/docs)
- **Three.js Documentation:** [threejs.org/docs](https://threejs.org/docs)
- **Web Development Guide:** [developer.mozilla.org](https://developer.mozilla.org)

### Community Support
- Create issues on GitHub repository
- Join web development communities
- Ask questions on Stack Overflow
- Contact project maintainers

---

## ✅ Quick Checklist

Before launching:
- [ ] All files in same directory
- [ ] Live Server extension installed
- [ ] Internet connection active
- [ ] Modern browser available
- [ ] Mobile device for testing (optional)

For deployment:
- [ ] Test all features work
- [ ] Check mobile responsiveness
- [ ] Verify all links function
- [ ] Optimize for performance
- [ ] Set up analytics (optional)

---

**Happy Development! 🌾👨‍💻**

Need more help? Check the main [README.md](README.md) file for additional information.
