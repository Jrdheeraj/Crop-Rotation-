# Crop-Rotation
# Crop Rotation Hub - 3D Agricultural Community Website

A comprehensive, modern 3D animated website for the Crop Rotation Community Service Project. This platform combines cutting-edge web technologies with practical agricultural education to create an immersive experience for farmers and community members.

![Crop Rotation Hub](https://img.shields.io/badge/Project-Crop%20Rotation%20Hub-green)
![Tech Stack](https://img.shields.io/badge/Tech-HTML%20CSS%20JS%20Three.js-blue)
![Status](https://img.shields.io/badge/Status-Ready%20to%20Deploy-brightgreen)

## 🌟 Features

### 🎨 Visual & Interactive
- **3D Animated Background** - Immersive agricultural scenes with floating elements
- **Interactive Crop Rotation Visualizer** - 3D models showing 2, 3, and 4-year rotation cycles
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - GSAP-powered transitions and hover effects
- **Particle Effects** - Dynamic seed and growth animations

### 📚 Educational Content
- **Comprehensive Learning Resources** - Guides, videos, and interactive tutorials
- **Crop Planning Calculator** - Personalized recommendations based on farm data
- **Soil Health Analyzer** - Visual progress indicators and improvement tracking
- **Benefits Dashboard** - Animated statistics showing rotation advantages

### 👥 Community Features
- **Workshop Registration System** - Interactive calendar and event management
- **Farmer Success Stories** - Testimonials and case studies
- **Expert Team Profiles** - Meet the agricultural specialists
- **Community Forum Integration** - Discussion platform for farmers

### 🛠️ Practical Tools
- **Weather Dashboard** - Real-time agricultural forecasts
- **Resource Library** - Downloadable guides, manuals, and mobile app recommendations
- **Contact System** - Multi-channel communication options
- **Progress Tracking** - Visual metrics and achievement indicators

## 🚀 Quick Start

### Prerequisites
- **VS Code** - Latest version recommended
- **Live Server Extension** - For local development
- **Modern Web Browser** - Chrome, Firefox, Safari, or Edge
- **Internet Connection** - For CDN resources (Three.js, GSAP, Chart.js)

### Installation & Setup

1. **Clone/Download the Project**
   ```bash
   # If using Git
   git clone <your-repo-url>
   cd crop-rotation-website

   # Or extract the downloaded ZIP file
   ```

2. **Open in VS Code**
   ```bash
   # Navigate to project folder
   code .

   # Or open VS Code and use File > Open Folder
   ```

3. **Install Live Server Extension** (if not already installed)
   - Open VS Code Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Install the extension by Ritwick Dey

4. **Launch the Website**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Website will open in your default browser
   - URL will be: `http://127.0.0.1:5500/index.html`

### Alternative Setup (Without Live Server)
Simply double-click `index.html` to open directly in your browser. However, some features may not work due to CORS restrictions.

## 📁 File Structure

```
crop-rotation-website/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS with 3D animations
├── script.js           # JavaScript with Three.js integration
├── README.md           # This file
│
└── External Dependencies (via CDN):
    ├── Three.js r128    # 3D graphics library
    ├── GSAP 3.12.2      # Animation library
    ├── Chart.js         # Data visualization
    └── Font Awesome 6   # Icons
```

## 🎯 Key Sections

### 1. **Hero Section**
- 3D animated background with floating agricultural elements
- Dynamic statistics counter
- Call-to-action buttons

### 2. **About & Team**
- Mission and vision statements
- Expert team profiles with animations
- Project background and methodology

### 3. **Educational Hub**
- Interactive 3D crop rotation visualizer
- Benefits dashboard with animated progress circles
- Comprehensive rotation cycle explanations

### 4. **Workshops & Events**
- Interactive event calendar
- Workshop registration system
- Training material access

### 5. **Farmer Portal**
- Crop planning calculator
- Weather dashboard
- Soil health analyzer
- Community forum

### 6. **Impact & Success Stories**
- Animated statistics dashboard
- Farmer testimonials
- Before/after case studies

### 7. **Resources Center**
- Downloadable guides and manuals
- Video tutorial library
- Mobile app recommendations

### 8. **Contact & Support**
- Multi-channel contact options
- Interactive contact form
- Social media integration

## 🔧 Customization Guide

### Updating Content

1. **Modify Text Content**
   - Edit HTML in `index.html`
   - Update team member information
   - Change workshop details and dates

2. **Customize Colors**
   ```css
   /* In styles.css, modify CSS variables */
   :root {
       --primary-green: #2D5A27;      /* Main green */
       --secondary-green: #4A7C59;    /* Secondary green */
       --accent-green: #8BC34A;       /* Accent color */
       --light-green: #C8E6C9;        /* Light background */
   }
   ```

3. **Update Statistics**
   ```html
   <!-- In index.html, modify data-count attributes -->
   <span class="stat-number" data-count="2500">0</span>
   ```

### Adding New Features

1. **New 3D Elements**
   ```javascript
   // In script.js, add to createFloatingElements()
   const newGeometry = new THREE.BoxGeometry(1, 1, 1);
   const newMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
   ```

2. **Additional Animations**
   ```css
   /* Add custom animations in styles.css */
   @keyframes customAnimation {
       from { opacity: 0; }
       to { opacity: 1; }
   }
   ```

## 🌐 Browser Compatibility

- **Chrome** ✅ Full support
- **Firefox** ✅ Full support  
- **Safari** ✅ Full support
- **Edge** ✅ Full support
- **Mobile Browsers** ✅ Optimized experience

## 📱 Mobile Optimization

The website includes comprehensive mobile optimizations:
- Responsive design for all screen sizes
- Touch-friendly interactions
- Reduced 3D complexity on mobile devices
- Optimized loading performance

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags for social media sharing
- Optimized images and assets
- Accessible design (WCAG compliant)
- Fast loading performance

## 🛠️ Development Tips

### VS Code Extensions (Recommended)
- **Live Server** - Local development server
- **Prettier** - Code formatting
- **Auto Rename Tag** - HTML tag synchronization
- **CSS Peek** - CSS class navigation
- **JavaScript (ES6) Snippets** - Code snippets

### Performance Optimization
- Images are optimized for web
- CDN resources for faster loading
- Minimal HTTP requests
- Efficient 3D rendering

### Debugging
- Use browser Developer Tools (F12)
- Check Console for JavaScript errors
- Monitor Network tab for resource loading
- Use Three.js inspector for 3D debugging

## 🌍 Deployment Options

### Option 1: GitHub Pages
1. Upload files to GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via: `https://yourusername.github.io/repository-name`

### Option 2: Netlify
1. Drag and drop project folder to netlify.com
2. Get instant deployment URL
3. Custom domain support available

### Option 3: Traditional Web Hosting
1. Upload all files to web hosting provider
2. Ensure proper file permissions
3. Access via your domain name

## 🤝 Contributing

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Areas for Enhancement
- Additional crop types and rotation cycles
- Advanced 3D animations
- Real weather API integration
- Database backend integration
- User authentication system

## 📞 Support

### Getting Help
- Check browser console for errors
- Verify all files are in the same directory
- Ensure internet connection for CDN resources
- Update browser to latest version

### Common Issues

**Issue: 3D scenes not loading**
- Check internet connection (Three.js CDN)
- Verify browser supports WebGL
- Check console for JavaScript errors

**Issue: Animations not working**
- Ensure GSAP CDN is loaded
- Check CSS animation support
- Verify JavaScript is enabled

**Issue: Mobile performance**
- 3D complexity is automatically reduced
- Some animations disabled on smaller screens
- Touch interactions optimized

## 📄 License

This project is developed for educational and community service purposes. 

### Credits
- **Three.js** - 3D graphics library
- **GSAP** - Animation library
- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **Chart.js** - Data visualization

## 🔄 Version History

- **v1.0.0** - Initial release with full 3D features
- **v1.1.0** - Mobile optimizations added
- **v1.2.0** - Enhanced accessibility features

---

## 🎓 Educational Impact

This website serves as a comprehensive educational platform for:
- **Farmers** - Learn sustainable crop rotation practices
- **Students** - Study modern agricultural techniques
- **Researchers** - Access community data and outcomes
- **Policy Makers** - Understand grassroots agricultural innovation

## 🌱 Community Goals

The Crop Rotation Hub aims to:
- Increase adoption of sustainable farming practices
- Build stronger agricultural communities
- Provide accessible education resources
- Support farmer knowledge sharing
- Promote environmental conservation

---

**Happy Coding! 🚀🌾**

For questions or support, please contact: [info@croprotationproject.org](mailto:info@croprotationproject.org)
