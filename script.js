'use strict';

///////////////////////////////////////
////////////BANKIST - WEBSITE//////////
///////////////////////////////////////

////////////Modal window///////////////////////////////////////////////////////////////////////////////////////////////////

// Selecting Elements for Modal Window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); //will give nodelist of 2 values

// function to open modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// function to close modal window
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Event listeners for Modal window
btnCloseModal.addEventListener('click', closeModal); // X button in modal Window
overlay.addEventListener('click', closeModal); // overlay container div surrounding modal window
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal)); // login button for Modal window

// Esc key eventListener
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Selecting Elements for Learn More Button
const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// smooth scroll to section1 for learn more button
btnLearnMore.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////Tabbed Component////////////////////////////////////////////////////////////////////

//Event Delegation applied on buttons of container

const tabsContainer = document.querySelector('.operations__tab-container'); // container of all 3 buttons
const tabs = document.querySelectorAll('.operations__tab'); // 3 buttons
const tabsContent = document.querySelectorAll('.operations__content'); // container of all 3 content

tabsContainer.addEventListener('click', function (e) {
  // lets store value of event in variable
  const clicked = e.target.closest('.operations__tab'); // this will exactly give button element and not span element inside it,closest element is used when you have a child element and you need closest parent element

  // modern if condition to handle null values
  if (!clicked) return;
  // console.log(clicked.dataset.tab); this will exact dataset number

  // removing active class on all three buttons
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  // removing active class from old content
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  // then add active class specifically to which button was clicked
  clicked.classList.add('operations__tab--active');

  // when clicked below content area should also activate content based on clicked-dataset-tab mentioned in HTML
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////Nav bar Fade animation////////////////////////////////////////////////////////////////////
// passing arguments to event handlers

const nav = document.querySelector('.nav');

const handleOver = function (e) {
  // first checking if e.target contains the class nav__link of a tag
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    console.log(link);
    const sibling = link.closest('.nav').querySelectorAll('.nav__link'); // this will all nav links under the parent element
    console.log(sibling);
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// bind method used to pass arguments into event handler funciton using this keyword
const binding = handleOver.bind(0.5); // returns a fucntion and that can be added in event listener

nav.addEventListener('mouseover', binding);
nav.addEventListener('mouseout', handleOver.bind(1));

///////////Sticky Navigation//////////////////////////////////////////////////////////////////////////////////

// always select first section , in this case header section
// so sticky navigation will be applied after target element (header) is out of viewport

const header = document.querySelector('.header');
// to get navigation height
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

// callback function for Intersection Observer API
const stickyNavCallBack = function (entries) {
  // console.log(entries); contains Intersection Observatory Entry
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// creating Intersection Obsever API with callback function and options
const headObserver = new IntersectionObserver(stickyNavCallBack, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

// using observe method to obersve the header
headObserver.observe(header);

///////////Revealing Elements on Scroll//////////////////////////////////////////////////////////////////////////////////

//  add this css class to all section , preserves the height but invisible
//  .section--hidden {
//   opacity: 0;
//   transform: translateY(8rem);
// }

// reveal sections
const allSections = document.querySelectorAll('.section'); //will give array of elements with class section

// creating new observer for sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  // guard clause
  if (!entry.isIntersecting) return;
  // console.log(entry.target);
  entry.target.classList.remove('section--hidden');
  // stop observing
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// adding section-hidden class to all section property
allSections.forEach(function (section) {
  // console.log(section);
  // observing each section
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////Lazy Loading of Images//////////////////////////////////////////////////////////////////////////////////

// to increase performance of the site and having low resouliton images load at first and then replace with high resolution images , giving time to load

// lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  // repalcing img src file
  entry.target.src = entry.target.dataset.src;

  // adding load event listener , removing blur only after imag fully loads
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  // unobserve the images
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(el => imgObserver.observe(el));
