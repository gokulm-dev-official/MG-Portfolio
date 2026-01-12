# Premium Enterprise Portfolio

## 🚀 Getting Started

This is a premium, high-performance portfolio template designed to make a strong first impression.

### 1. Project Structure
```
premium-portfolio/
├── index.html          # Main HTML structure
├── css/
│   ├── custom.css      # Custom animations and styles
├── js/
│   ├── main.js         # Core logic (Menu, Stats, Theme)
│   ├── projects.js     # Project filtering logic
│   ├── cursor.js       # Custom cursor effects
│   ├── animations.js   # Scroll animations
├── assets/
│   └── images/         # Place your images here
```

### 2. Customization Steps (CRITICAL)

To make this portfolio yours, you **MUST** replace the placeholder content:

#### 🖼️ Images
Replace the following images in `assets/images/`:
- `profile.jpg`: Your professional photo in the About section.
- `project1.jpg` to `project4.jpg`: Screenshots of your projects.
- `og-image.jpg`: For social media sharing preview.
- **Note**: The current code uses placeholders (`via.placeholder.com`) if images are missing, so it looks good out of the box, but you should add real images.

#### 📝 Content
Edit `index.html` to update:
- **Hero**: Your Name (`Gokul M`) and Taglines.
- **Experience**: Your actual work history.
- **Projects**: Your real project details and links.
- **Contact**: Your email address (`mailto:your@email.com`) and phone number.
- **Social Links**: Update `href="#"` with your real LinkedIn/GitHub URLs.

#### 🎨 colors
The primary colors are defined in `index.html` under `tailwind.config` script and `css/custom.css`.
- `primary`: `#667eea` to `#764ba2` (Purple/Blue gradient)
- Change these verify hex codes to match your personal brand if needed.

### 3. Deployment
This site is static and ready to deploy anywhere:
- **Vercel/Netlify**: Just drag and drop the folder.
- **GitHub Pages**: Push to a repository and enable Pages.

### 4. Features Included
- ✅ Dark/Light Mode (Auto-detects system preference)
- ✅ Responsive Mobile Menu
- ✅ Custom Cursor & Magnetic Buttons
- ✅ Project Filtering
- ✅ Animated Counters
- ✅ Contact Form (UI Only - integration with EmailJS recommended)

Enjoy your new portfolio!
