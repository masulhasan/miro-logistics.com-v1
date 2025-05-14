const leftCursor = document.querySelector('.left-cursor');
const rightCursor = document.querySelector('.right-cursor');
const logoIcon = document.querySelector('.logo-icon');
const contactLink = document.querySelector('.contact-link');
const segments = document.querySelectorAll('.segment');
let isScrolling = false;
let activeSegment = null;

window.addEventListener('scroll', function () {
  isScrolling = true;
  leftCursor.style.display = 'none';
  rightCursor.style.display = 'none';
  setTimeout(() => isScrolling = false, 50);
});

document.addEventListener('mousemove', function (e) {
  if (isScrolling) return;

  const isOverClickable = e.target.closest('.top-bar') ||
                          e.target === logoIcon ||
                          e.target === contactLink;

  // Add check for segments
  const isOverSegment = e.target.closest('.segment');

  if (isOverClickable || isOverSegment) {
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

// Handle clicks on segments
segments.forEach(segment => {
  segment.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Stop event bubbling
    
    // Remove active class from previously active segment
    if (activeSegment) {
      activeSegment.classList.remove('active');
    }
    
    // If we clicked the same segment that was already active, just deactivate it
    if (activeSegment === this) {
      activeSegment = null;
    } else {
      // Otherwise, set the clicked segment as active
      this.classList.add('active');
      activeSegment = this;
    }
  });
});

document.addEventListener('click', function(e) {
  // Don't navigate if clicking on interactive elements
  if (e.target.closest('.top-bar') || 
      e.target === logoIcon || 
      e.target === contactLink ||
      e.target.closest('.segment') ||
      e.target.closest('.team-member a')) {
    return;
  }
  
  const middle = window.innerWidth / 2;
  const isLeftSide = e.clientX < middle;
  
  if (isLeftSide) {
    // Go to previous page
    window.location.href = './Renewable-confidence.html';
  } else {
    // Go to next page
    window.location.href = './In-Numbers.html';
  }
});