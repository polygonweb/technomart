import { TweenLite } from 'gsap';


export default class Slider {
  constructor(rootElement) {
    this.DOM = {};
    this.DOM.rootElement = rootElement;
    var slides = Array.prototype.slice.call(rootElement.querySelectorAll('.slide'));
    this.DOM.slides = slides;
    this.DOM.prevBtn = rootElement.querySelector('.slider__btn_prev');
    this.DOM.nextBtn = rootElement.querySelector('.slider__btn_next');
    this.DOM.dots = Array.prototype.slice.call(rootElement.querySelectorAll('.dot'));
    this.DOM.navBar = rootElement.querySelector('.slider__nav-items');

    this.slidesLength = this.DOM.slides.length;
    this.current = 0;
    this.isAnimating = false;
    this.duration = 0.5;

    this.bindEvents();
  }

  bindEvents() {
    var self = this;
    ['goNext', 'goPrev', 'navClickHandler'].forEach(method => {
      self[method] = self[method].bind(self);
    });
    self.DOM.nextBtn.addEventListener('click', self.goNext);
    self.DOM.prevBtn.addEventListener('click', self.goPrev);
    self.DOM.navBar.addEventListener('click', self.navClickHandler);
  }

  goStep(dir) {
    let index = this.current + dir;
    let len = this.slidesLength;
    let currentIndex = (index + len) % len;
    this.goTo(currentIndex, dir);
  }

  goNext() {
    this.goStep(1);
  }

  goPrev() {
    this.goStep(-1);
  }

  goTo(index, dir) {
    if (this.isAnimating) return;
    var self = this;
    let prevSlide = this.DOM.slides[this.current];
    let nextSlide = this.DOM.slides[index];

    self.isAnimating = true;
    self.current = index;
    nextSlide.classList.add('slide_active');

    TweenLite.fromTo(nextSlide, self.duration,
      { xPercent: 100 * dir },
      { xPercent: 0 }
    );

    TweenLite.fromTo(prevSlide, self.duration,
      { xPercent: 0 },
      {
        xPercent: -100 * dir,
        onComplete: function() {
          self.isAnimating = false;
          prevSlide.classList.remove('slide_active');
          self.DOM.dots.forEach((item, index) => {
            var action = index === self.current ? 'add' : 'remove';
            item.classList[action]('dot_active');
          });
        }
      }
    );
  }

  navClickHandler(e) {
    var self = this;
    if (self.isAnimating) return;
    let target = e.target.closest('.dot');
    if (!target) return;
    let index = self.DOM.dots.indexOf(target);
    if (index === self.current) return;
    let direction = index > self.current ? 1 : -1;
    self.goTo(index, direction);
  }
}
