// Nav dropdown — keyboard navigation and accessibility
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item-dropdown').forEach(item => {
    const btn = item.querySelector('.nav-dropdown-btn');
    const menu = item.querySelector('.nav-dropdown');
    const links = menu ? Array.from(menu.querySelectorAll('.nav-dropdown-item')) : [];

    function open() {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }

    function close() {
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }

    // Click toggles (useful on touch / keyboard-only)
    btn.addEventListener('click', () => {
      item.classList.contains('open') ? close() : open();
    });

    // Keyboard: open on ArrowDown from trigger
    btn.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); open(); links[0]?.focus(); }
      if (e.key === 'Escape') close();
    });

    // Keyboard: navigate items
    links.forEach((link, i) => {
      link.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') { e.preventDefault(); links[i + 1]?.focus(); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); (i === 0 ? btn : links[i - 1]).focus(); }
        if (e.key === 'Escape')    { close(); btn.focus(); }
      });
    });
  });

  // Close when clicking outside
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-item-dropdown')) {
      document.querySelectorAll('.nav-item-dropdown.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.nav-dropdown-btn').setAttribute('aria-expanded', 'false');
      });
    }
  });
});
