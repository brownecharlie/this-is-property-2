export default function toggleDropdown(event, el) {
  const target = event.currentTarget.parentElement.querySelector(el);

  event.currentTarget.parentElement.classList.toggle('is-active');

  if (!event.currentTarget.parentElement.classList.contains('is-active')) {
    TweenMax.to(target, 0.5, {
      height: 0,
      ease: Power3.easeOut,
    });      
  } else {
    TweenMax.set(target, { height: 'auto' });
    TweenMax.from(target, 0.5, {
      height: 0,
      ease: Power3.easeOut,
    });
  }
}