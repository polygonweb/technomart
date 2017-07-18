import { getScrollBarValue, isOverflow } from '../utils'

let body = document.body;
let scrollValue = getScrollBarValue();

export default function modal(elem) {
  if (!elem) return;

  return {
    isOpen: function() {
      elem.classList.contains('modal_show');
    },

    open: function(callback) {
        elem.classList.add('modal_show');
        body.style.paddingRight = isOverflow(body) ? `${scrollValue}px` : '';
        body.style.overflow = 'hidden';
        document.addEventListener('click', outSideClickHandler);
        typeof callback === 'function' && callback();
        return this;
    },

    close: function(callback) {
        elem.classList.remove('modal_show');
        body.style.overflow = '';
        body.style.paddingRight = '';
        document.removeEventListener('click', outSideClickHandler);
        typeof callback === 'function' && callback();
        return this;
    },

    toggle: function(callback) {
        this.isOpen() ? this.close(callback) : this.open(callback);
        return this;
    },
  }
}

function outSideClickHandler(e) {
  var modalElement = e.target.closest('.modal');
  if (!modalElement) return;
  var dialog = modalElement.querySelector('.modal__dialog');
  if (!dialog) return;
  if (!dialog.contains(e.target)) {
    modal(modalElement).close();
  }
}

function docClickHandler(e) {
  var modalBtn = e.target.closest('[data-modal]');
  if (!modalBtn) return;
  try {
      var data = JSON.parse(modalBtn.getAttribute('data-modal'));
      var elem = document.querySelector(data.target);
      modal(elem)[data.action]();
      e.preventDefault();
  } catch(e) {
    console.error('Ошибка обработки атрибута data-modal');
  }
}

function closeHandler(e) {
  var modalClose = e.target.closest('.modal__close');
  if (!modalClose) return;
  var modalElem = modalClose.closest('.modal');
  if (!modalElem) return;
  modal(modalElem).close();
  e.preventDefault();
}

document.addEventListener('click', docClickHandler);
document.addEventListener('click', closeHandler);
