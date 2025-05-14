const leftCursor = document.querySelector('.left-cursor');
const rightCursor = document.querySelector('.right-cursor');
const logoIcon = document.querySelector('.logo-icon');
const contactLink = document.querySelector('.contact-link');
let isScrolling = false;

// Make sure all videos are properly set to loop
document.addEventListener('DOMContentLoaded', function() {
  // Get all videos on the page
  const allVideos = document.querySelectorAll('video');
  
  // For each video, ensure it has proper loop attributes
  allVideos.forEach(video => {
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true; // Better mobile support
    
    // Force play the video if it's not already playing
    if (video.paused) {
      video.play().catch(e => console.log('Video play error:', e));
    }
    
    // Add event listeners to ensure continuous playback
    video.addEventListener('pause', function() {
      this.play().catch(e => console.log('Video play error:', e));
    });
    
    video.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play().catch(e => console.log('Video play error:', e));
    });
  });
  
  // Ensure smooth scrolling in the carousel
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
    // Temporarily pause animation
    carouselTrack.style.animationPlayState = 'paused';
    
    // Force a reflow to ensure smoother animation start
    void carouselTrack.offsetWidth;
    
    // Resume animation
    carouselTrack.style.animationPlayState = 'running';
  }
});

// Prevent potential stuttering in the scroll animation
window.addEventListener('scroll', function () {
  isScrolling = true;
  leftCursor.style.display = 'none';
  rightCursor.style.display = 'none';
  
  // Don't interfere with the CSS animation during scroll
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
    carouselTrack.style.animationPlayState = 'running';
  }
  
  setTimeout(() => isScrolling = false, 50);
});

document.addEventListener('mousemove', function (e) {
  if (isScrolling) return;

  const isOverClickable = e.target.closest('.top-bar') ||
                          e.target === logoIcon ||
                          e.target === contactLink;

  if (isOverClickable) {
    leftCursor.style.display = 'none';
    rightCursor.style.display = 'none';
    return;
  }

  const middle = window.innerWidth / 2;
  const isLeftSide = e.clientX < middle;

  const cursor = isLeftSide ? leftCursor : rightCursor;
  const otherCursor = isLeftSide ? rightCursor : leftCursor;

  otherCursor.style.display = 'none';

  cursor.style.display = 'block';
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.addEventListener('click', function(e) {
  // Don't navigate if clicking on interactive elements
  if (e.target.closest('.top-bar') || 
      e.target === logoIcon || 
      e.target === contactLink ||
      e.target.closest('.team-member a')) {
    return;
  }
  
  const middle = window.innerWidth / 2;
  const isLeftSide = e.clientX < middle;
  
  if (isLeftSide) {
    // Go to previous page
    window.location.href = './index.html';
  } else {
    // Go to next page
    window.location.href = './Partners.html';
  }
});

// Check video status periodically to ensure they're playing
setInterval(function() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    if (video.paused) {
      video.play().catch(e => console.log('Video play error:', e));
    }
  });
}, 3000);

// Handle visibility change to resume videos when tab becomes active again
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      if (video.paused) {
        video.play().catch(e => console.log('Video play error:', e));
      }
    });
  }
});