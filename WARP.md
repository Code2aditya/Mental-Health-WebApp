# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
This is a mental health support web application called "MindWell" that provides comprehensive wellness resources, mood tracking, community support, and crisis intervention features. The project is built with vanilla JavaScript, HTML5, and CSS3 with a focus on accessibility and responsive design.

## Development Commands

### Development Server
```bash
npm run dev
```
Uses live-server to serve the application locally with automatic reloading.

### Build
```bash
npm run build
```
Builds both CSS (from SASS) and JavaScript (via Webpack) for production.

### Individual Build Commands
```bash
npm run build:css    # Build CSS from SASS files
npm run build:js     # Build JavaScript with Webpack
```

### Testing and Quality
```bash
npm test             # Run Jest tests
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Production
```bash
npm start            # Start production server with Node.js/Express
```

## Architecture & Code Structure

### Application State Management
The app uses a centralized `AppState` object in `js/main.js` to manage:
- Current user session
- Active page/section
- Mood tracking data
- Navigation state

### Core Architectural Patterns

**DOM Element Caching**: All frequently accessed DOM elements are cached in the `DOM` object at initialization to improve performance.

**Event-Driven Architecture**: The application uses a centralized event handling system with proper event delegation and keyboard navigation support.

**Accessibility-First Design**: Built-in accessibility features including:
- ARIA attributes management
- Keyboard navigation support
- Focus management for modals
- Skip links for screen readers
- Reduced motion preference detection

**Responsive Design System**: Uses CSS custom properties (variables) for consistent theming and responsive breakpoints at 1024px, 768px, and 480px.

### Key Components

**Navigation System** (`initializeNavigation`): Handles both desktop and mobile navigation with smooth scrolling, active state management, and mobile hamburger menu.

**Crisis Support System** (`handleEmergencyClick`): Critical safety feature that displays emergency resources modal with crisis hotlines and immediate help options.

**Feature Cards with Animations**: Uses Intersection Observer API for scroll-triggered animations with performance optimization.

**Button Interactions**: Implements ripple effects and hover states with transform animations for enhanced UX.

### File Organization
- `index.html` - Main application entry point with semantic HTML structure
- `css/main.css` - Comprehensive styling system with CSS custom properties
- `js/main.js` - Core application logic and component management
- Empty directories (`components/`, `utils/`, `public/`, `assets/`) are placeholders for future modular architecture

### Development Guidelines

**Mental Health Sensitivity**: This application handles sensitive mental health data. All features must be implemented with:
- Privacy and security as top priorities
- Compliance with healthcare data regulations
- Careful implementation of crisis intervention features
- Accessibility compliance (WCAG 2.1)

**Code Patterns to Follow**:
- Use semantic commit messages
- Cache DOM elements in the `DOM` object
- Implement proper error handling for localStorage operations
- Add analytics tracking placeholders for user interactions
- Use the utility functions in `Utils` object for common operations

**State Management**: 
- Update `AppState` for any application-wide state changes
- Use the centralized event handling patterns established in `setupEventListeners`
- Follow the existing naming conventions for function organization

### Browser Support
Configured for modern browsers with Browserslist:
- `> 1%`
- `last 2 versions` 
- `not dead`

### Performance Considerations
- Implements debouncing for resize events
- Uses Intersection Observer for scroll animations
- Includes `prefers-reduced-motion` detection
- CSS animations use `transform` properties for better performance

## Testing Strategy
The project is set up for Jest testing. When writing tests, focus on:
- Emergency support functionality (critical for user safety)
- Navigation and accessibility features
- State management functions
- Utility functions in the `Utils` object
