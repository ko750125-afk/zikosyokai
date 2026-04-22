# 정적 자기소개 사이트

[의상디자이너-자기소개서.md](../의상디자이너-자기소개서.md) 내용을 바탕으로 한 HTML / CSS / JavaScript 전용 페이지입니다. 디렉터리는 GitHub Pages 등 정적 호스팅에 바로 올릴 수 있게 **상대 경로**(`css/`, `js/`)만 사용합니다.

## 로컬에서 미리보기

`fashion-portfolio-site` 폴더로 이동한 뒤, HTTP로 서빙하는 것이 안전합니다 (`file://` 직접 열기는 스크립트/폰트에서 문제가 날 수 있음).

**Node (npx serve)**

```bash
cd fashion-portfolio-site
npx --yes serve .
```

브라우저에서 터미널에 표시된 주소(기본은 `http://localhost:3000`)로 접속합니다.

**Next.js와 포트가 겹칠 때:** 로컬에서 `memo` 등 **Next 개발 서버**도 `3000`을 쓰는 경우가 많습니다. 정적 사이트만 볼 때는 **다른 포트**로 띄우면 혼동이 줄어듭니다.

```bash
npx --yes serve . -p 4173
```

### 터미널에 `GET /_next/webpack-hmr` 404가 보일 때

이 프로젝트는 Next가 아니라 **순수 HTML/CSS/JS**라 `/_next/...` 경로는 없습니다. 같은 주소(`localhost:3000` 등)에서 **이전에 연 Next 탭**이 열려 있으면, 브라우저가 **HMR(핫 리로드) 폴링**을 계속 보내 `serve` 로그에 404가 반복될 수 있습니다. **해당 탭을 닫거나** **시크릿 창**에서 정적 사이트만 새로 열면 사라집니다. `GET /`·`css`·`js`가 200이면 정적 페이지는 정상입니다.

### `Unsafe attempt to load URL http://localhost:3000/ ... chrome-error://chromewebdata/`

이 프로젝트 HTML에는 `iframe`으로 로컬 주소를 넣는 코드가 **없습니다**. 이 메시지는 보통 **연결에 실패한 뒤** Chrome이 띄운 **오류 페이지**(`chrome-error://...`) 안에서, 어딘가(미리보기·확장 프로그램 등)가 다시 `http://localhost:3000`을 불러오려 할 때 **출처(origin)가 달라서** 막힐 때 납니다.

1. 터미널에서 `serve`(또는 `python -m http.server`)를 **먼저** 실행한다.  
2. 브라우저·Simple Browser에는 터미널에 나온 주소와 **포트가 같은지** 확인한다(3000이 아니면 `http://localhost:4173` 등으로 연다).  
3. 이전에 떠 있던 **오류 탭**은 닫고, **새 탭**에서 주소를 다시 연다.  
4. 그래도 같으면 IDE 내장 미리보기 대신 **시스템 Chrome**에서 같은 URL을 연다.

**Python**

```bash
cd fashion-portfolio-site
python -m http.server 8080
```

`http://localhost:8080` 로 접속합니다.

## GitHub Pages에 배포

**브랜치에서 직접 배포**하는 방식이 가장 단순합니다(정적 `index.html` + `.nojekyll`).

1. [zikosyokai → Settings → Pages](https://github.com/ko750125-afk/zikosyokai/settings/pages) 를 연다.  
2. **Build and deployment** → **Source**를 **Deploy from a branch** 로 바꾼다. (지금 “GitHub Actions”로 돼 있으면 반드시 여기로 바꾼다.)  
3. **Branch:** `main`, **Folder:** `/ (root)` → **Save**.  
4. 1~2분 뒤 사이트: `https://ko750125-afk.github.io/zikosyokai/`

`main`에 푸시할 때마다 Pages가 갱신된다. (이전에 쓰던 **GitHub Actions**용 `pages.yml`은 제거함 — Actions/브랜치를 동시에 쓰면 헷갈리고, 프로젝트 사이트는 브랜치 배포가 안정적이다.)

## 수정할 곳

- **[성명]**, **연락처**, **이메일**, **지원 직무**, 수치 **\[N\]** 등은 `index.html`에서 직접 치환하세요.
- 색·여백·폰트는 `css/style.css`의 `:root` 변수를 조정하세요.
