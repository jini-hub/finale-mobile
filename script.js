// 아주 단순한 해시 기반 라우터
const screens = Array.from(document.querySelectorAll('.screen'));
const appbar = document.getElementById('appbar');
const tabbar = document.getElementById('tabbar');
const backBtn = document.getElementById('backBtn');

function show(route){
  // 존재하지 않으면 기본 홈 or 로그인
  if(!document.getElementById(route)){
    route = (localStorage.getItem('authed') === '1') ? 'home' : 'login';
    history.replaceState(null, '', '#' + route);
  }
  screens.forEach(s => s.style.display = (s.id === route ? 'block' : 'none'));
  // 상단 타이틀 교체
  const current = document.getElementById(route);
  const title = current?.dataset.title || '';
  const showBottom = current?.dataset.showBottomnav !== 'false';
  appbar.querySelector('.brand').style.display = title ? 'none' : 'flex';
  backBtn.hidden = (route === 'home' || route === 'login');
  document.title = (title ? title + ' | ' : '') + 'Finale';
  // 하단 탭바 표시 여부
  tabbar.style.display = showBottom ? 'grid' : 'none';
  // 탭 활성화
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.route === route));
}

window.addEventListener('hashchange', () => show(location.hash.replace('#','')));

// 초기 라우트
show(location.hash.replace('#','') || (localStorage.getItem('authed') === '1' ? 'home' : 'login'));

// 뒤로가기
backBtn.addEventListener('click', () => history.back());

// 로그인 폼 -> 홈 이동
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('authed','1');
  location.hash = 'home';
});

// 회원가입 이동/뒤로
document.getElementById('goSignup')?.addEventListener('click', () => location.hash='signup');
document.getElementById('signupBack')?.addEventListener('click', () => history.back());

// 새 상속 시작하기 버튼 -> 법무 서비스로 이동(예시)
document.getElementById('startNew')?.addEventListener('click', () => location.hash='legal');
