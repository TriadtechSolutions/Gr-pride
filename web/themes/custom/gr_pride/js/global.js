/**
 * @file
 * Global utilities.
 *
 */
(function (Drupal,$, once) {

  'use strict';

 Drupal.behaviors.swiperInit = {
  attach: function (context, settings) {
    const sliders = once('swiper-init', '.swiper-container', context);

    sliders.forEach((slider) => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 992) {
        const pagination = slider.querySelector('.swiper-pagination');
        const nextBtn = slider.querySelector('.swiper-button-next');
        const prevBtn = slider.querySelector('.swiper-button-prev');

        new Swiper(slider, {
          loop: true,
          autoplay: {
            delay: 2400,
            disableOnInteraction: false,
          },
          spaceBetween: 20,
          breakpoints: {
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          },
          pagination: {
            el: pagination,
            clickable: true,
          },
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
          },
        });

      } else {
        // On desktop, show all slides statically (no Swiper)
        const wrapper = slider.querySelector('.swiper-wrapper');
        const slides = wrapper.querySelectorAll('.swiper-slide');

        wrapper.style.display = 'flex';
        wrapper.style.flexWrap = 'wrap';
        wrapper.style.gap = '20px';

        slides.forEach((slide) => {
          slide.style.flex = '1 0 calc(25% - 20px)';
          slide.style.maxWidth = 'calc(25% - 20px)';
        });

        // Hide Swiper controls
        const pagination = slider.querySelector('.swiper-pagination');
        const nextBtn = slider.querySelector('.swiper-button-next');
        const prevBtn = slider.querySelector('.swiper-button-prev');

        if (pagination) pagination.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (prevBtn) prevBtn.style.display = 'none';
      }
    });
  }
};



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

})(Drupal,jQuery,once);
