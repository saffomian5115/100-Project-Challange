const btns = document.querySelectorAll('.btnAccordion');

btns.forEach(btn => {
  btn.addEventListener('click', () =>{
    const item = btn.closest('.accordion-item');
    const content = item.querySelector('.accordion-content');
    if(btn.classList.contains('rotate')) {
      content.classList.remove('open');
      btn.classList.remove('rotate');
    }
    else {
    btn.classList.add('rotate');
    content.classList.add('open');
    }
  })
})