// ========================================
// Hash-based Router
// ========================================

export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.onNavigate = null;
    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('load', () => this.resolve());
  }

  add(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/';
    
    // Try exact match first
    if (this.routes[hash]) {
      this.currentRoute = hash;
      this.routes[hash]();
      if (this.onNavigate) this.onNavigate(hash);
      return;
    }

    // Try pattern matching (e.g., /works/:id)
    for (const [pattern, handler] of Object.entries(this.routes)) {
      const regex = this.patternToRegex(pattern);
      const match = hash.match(regex);
      if (match) {
        this.currentRoute = hash;
        const params = this.extractParams(pattern, match);
        handler(params);
        if (this.onNavigate) this.onNavigate(hash);
        return;
      }
    }

    // Fallback to home
    if (this.routes['/']) {
      this.currentRoute = '/';
      this.routes['/']();
      if (this.onNavigate) this.onNavigate('/');
    }
  }

  patternToRegex(pattern) {
    // Split on :param placeholders, escape literal parts, rejoin with capture groups
    const parts = pattern.split(/:(\w+)/);
    let regexStr = '';
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Literal segment — escape special regex chars
        regexStr += parts[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      } else {
        // Parameter placeholder — replace with capture group
        regexStr += '([^/]+)';
      }
    }
    return new RegExp(`^${regexStr}$`);
  }

  extractParams(pattern, match) {
    const keys = [];
    const re = /:(\w+)/g;
    let m;
    while ((m = re.exec(pattern)) !== null) {
      keys.push(m[1]);
    }
    const params = {};
    keys.forEach((key, i) => {
      params[key] = match[i + 1];
    });
    return params;
  }

  navigate(path) {
    window.location.hash = path;
  }
}
