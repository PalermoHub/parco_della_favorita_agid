(function () {
  'use strict';

  function shareUrl() {
    return encodeURIComponent(window.location.href);
  }

  function shareTitle() {
    return encodeURIComponent(document.title);
  }

  function openPopup(url) {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=450');
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('.share-facebook, .share-twitter, .share-linkedin, .share-whatsapp, .share-mail, .share-copy, .page-print, .page-listen');
    if (!el) return;
    e.preventDefault();

    if (el.classList.contains('share-facebook')) {
      openPopup('https://www.facebook.com/sharer/sharer.php?u=' + shareUrl());
    } else if (el.classList.contains('share-twitter')) {
      openPopup('https://twitter.com/intent/tweet?url=' + shareUrl() + '&text=' + shareTitle());
    } else if (el.classList.contains('share-linkedin')) {
      openPopup('https://www.linkedin.com/sharing/share-offsite/?url=' + shareUrl());
    } else if (el.classList.contains('share-whatsapp')) {
      openPopup('https://api.whatsapp.com/send?text=' + shareTitle() + '%20' + shareUrl());
    } else if (el.classList.contains('share-mail')) {
      window.location.href = 'mailto:?subject=' + shareTitle() + '&body=' + shareUrl();
    } else if (el.classList.contains('share-copy')) {
      navigator.clipboard.writeText(window.location.href).then(function () {
        var label = el.querySelector('.share-copy-label');
        if (label) {
          var original = label.textContent;
          label.textContent = 'Link copiato!';
          setTimeout(function () { label.textContent = original; }, 2000);
        }
      });
    } else if (el.classList.contains('page-print')) {
      window.print();
    } else if (el.classList.contains('page-listen')) {
      togglePageListen(el);
    }
  });

  function togglePageListen(button) {
    if (!('speechSynthesis' in window)) return;
    var label = button.querySelector('.page-listen-label');

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (label) label.textContent = 'Ascolta';
      return;
    }

    var main = document.getElementById('main-content');
    var text = main ? main.innerText : document.body.innerText;
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.onend = function () {
      if (label) label.textContent = 'Ascolta';
    };
    window.speechSynthesis.speak(utterance);
    if (label) label.textContent = 'Interrompi';
  }
})();
