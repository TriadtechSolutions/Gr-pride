/**
 * @file
 * Global utilities.
 *
 */
(function (Drupal,$) {

  'use strict';

  Drupal.behaviors.gr_pride = {
    attach: function (context, settings) {

      // Use jQuery to find elements with class .anim-element in the current context
      const $elements = $('.anim-element', context);

      if ($elements.length === 0) {
        return;
      }

      // IntersectionObserver stays the same because it's native JS, but we can observe jQuery elements with .get()
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            $(entry.target).removeClass('rise-to-top').addClass('fall-from-top');
          } else {
            $(entry.target).removeClass('fall-from-top').addClass('rise-to-top');
          }
        });
      }, {
        threshold: 0.3
      });

      // Observe each element (convert jQuery objects to native DOM nodes)
      $elements.each(function () {
        observer.observe(this);
      });

      // Typing effect for .home-banner-desc within the context
      const el = context.querySelector('.home-banner-desc');

      if (el) {
        const text = el.textContent;
        el.textContent = '';
        let i = 0;

        function type() {
          if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 70); // typing speed in ms
          }
        }

        type();
      }

    }
  };

})(Drupal,jQuery);
