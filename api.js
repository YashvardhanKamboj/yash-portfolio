/* ==========================================================================
   API Integration Module
   Handles all backend API calls
   ========================================================================== */

const API_BASE = window.location.origin + '/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return { success: true };
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Contact Form API
export const submitContact = async (formData) => {
  return apiCall('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Analytics API
export const trackVisitor = async (data) => {
  try {
    return await apiCall('/analytics/track', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    // Fail silently for analytics
    console.warn('Analytics tracking failed:', error);
    return null;
  }
};

// Projects API
export const getProjects = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/projects${query ? '?' + query : ''}`);
};

export const getProject = async (id) => {
  return apiCall(`/projects/${id}`);
};

export const likeProject = async (id) => {
  return apiCall(`/projects/${id}/like`, {
    method: 'POST',
  });
};

// Blog API
export const getBlogPosts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/blog${query ? '?' + query : ''}`);
};

export const getBlogPost = async (slug) => {
  return apiCall(`/blog/${slug}`);
};

// Admin API
export const getDashboardStats = async () => {
  return apiCall('/admin/dashboard');
};

// Health check
export const checkHealth = async () => {
  try {
    return await apiCall('/health');
  } catch (error) {
    return null;
  }
};

// Visitor tracking helper
let sessionId = localStorage.getItem('sessionId') || null;
let visitStartTime = Date.now();

export const initVisitorTracking = () => {
  // Generate session ID if not exists
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }

  // Track page view
  trackVisitor({
    referrer: document.referrer || null,
    page: window.location.pathname,
    sessionId,
  });

  // Track page unload (duration)
  window.addEventListener('beforeunload', () => {
    const duration = Math.floor((Date.now() - visitStartTime) / 1000);
    navigator.sendBeacon(
      `${API_BASE}/analytics/track`,
      JSON.stringify({
        sessionId,
        page: window.location.pathname,
        duration,
      })
    );
  });
};

