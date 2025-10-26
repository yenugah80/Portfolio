# Portfolio Setup Guide

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yenugah80/Portfolio.git
   cd Portfolio
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python3 -m http.server 8000
     ```
     Then visit `http://localhost:8000`

## Customization Guide

### 1. Personal Information

Edit `index.html` to update:
- About Me section (lines 55-79)
- Skills section (lines 82-140)
- Experience section (lines 172-232)
- Education section (lines 236-271)
- Contact information (lines 277-317)

### 2. GitHub Integration

Edit `script.js` to change default username:
```javascript
const CONFIG = {
    defaultGitHubUsername: 'your-github-username',
    // ... other settings
};
```

### 3. Color Scheme

Edit `styles.css` to customize colors:
```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Secondary brand color */
    --accent-color: #ec4899;       /* Accent color */
    /* ... other colors */
}
```

### 4. Profile Image

Replace the placeholder in `index.html` (line 58-60):
```html
<div class="image-placeholder">
    <img src="your-photo.jpg" alt="Your Name" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
</div>
```

## Features

### GitHub Projects
- Automatically loads your GitHub repositories
- Shows repository descriptions, languages, stars, and forks
- Links to repository and live demos
- Enter any GitHub username to view their projects

### Responsive Design
- Works on all devices (mobile, tablet, desktop)
- Hamburger menu for mobile navigation
- Touch-friendly interface

### Interactive Elements
- Smooth scroll navigation
- Animated statistics counter
- Hover effects on cards
- Form validation
- Custom notifications

## Deployment

### GitHub Pages
1. Go to repository Settings
2. Navigate to Pages
3. Select branch: `main` or `copilot/build-portfolio-website`
4. Click Save
5. Your site will be live at `https://yourusername.github.io/Portfolio`

### Netlify
1. Sign up at netlify.com
2. Connect your GitHub repository
3. Click "Deploy site"
4. Your site will be live at a Netlify URL

### Vercel
1. Sign up at vercel.com
2. Import your GitHub repository
3. Click "Deploy"
4. Your site will be live at a Vercel URL

## Tips

1. **Update regularly**: Keep your GitHub projects active to showcase current work
2. **Customize content**: Make the experience and education sections reflect your actual background
3. **Add analytics**: Consider adding Google Analytics to track visitors
4. **SEO optimization**: Update meta tags in `index.html` for better search visibility
5. **Social links**: Update footer and contact section with your actual social media profiles

## Troubleshooting

### GitHub API Rate Limits
- GitHub allows 60 requests per hour for unauthenticated requests
- If you hit the limit, wait an hour or implement authentication
- Error message will appear: "API rate limit exceeded. Please try again later."

### Projects Not Loading
- Check browser console for errors
- Verify GitHub username is correct
- Ensure you have public repositories
- Check internet connection

### Styling Issues
- Clear browser cache
- Check if all CSS files are loading
- Verify Font Awesome CDN is accessible

## Support

For issues or questions:
1. Check the README.md
2. Review the code comments
3. Open an issue on GitHub

## License

See LICENSE file in the repository.
