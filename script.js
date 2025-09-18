// 아주 단순한 해시 기반 라우터
const screens = Array.from(document.querySelectorAll('.screen'));
const appbar = document.getElementById('appbar');
const tabbar = document.getElementById('tabbar');
const backBtn = document.getElementById('backBtn');

function show(route){
  if(!document.getElementById(route)){
    route = (localStorage.getItem('authed') === '1') ? 'home' : 'login';
    history.replaceState(null, '', '#' + route);
  }
  screens.forEach(s => s.style.display = (s.id === route ? 'block' : 'none'));
  const current = document.getElementById(route);
  const title = current?.dataset.title || '';
  const showBottom = current?.dataset.showBottomnav !== 'false';
  appbar.querySelector('.brand').style.display = title ? 'none' : 'flex';
  backBtn.hidden = (route === 'home' || route === 'login');
  document.title = (title ? title + ' | ' : '') + 'Finale';
  tabbar.style.display = showBottom ? 'grid' : 'none';
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.route === route));
}

window.addEventListener('hashchange', () => show(location.hash.replace('#','')));
show(location.hash.replace('#','') || (localStorage.getItem('authed') === '1' ? 'home' : 'login'));

backBtn.addEventListener('click', () => history.back());

document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('authed','1');
  location.hash = 'home';
});

document.getElementById('goSignup')?.addEventListener('click', () => location.hash='signup');
document.getElementById('signupBack')?.addEventListener('click', () => history.back());

// 새 상속 시작하기 -> 선택 화면
document.getElementById('startNew')?.addEventListener('click', () => location.hash='choose');
