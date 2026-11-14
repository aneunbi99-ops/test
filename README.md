# 귀여움 수집소

큰 초록 칠판에 그리고 닉네임을 달면 그림이 움직이는 친구로 모입니다. Vercel 정적 배포 + Firebase Authentication / Cloud Firestore 구성입니다. 라이브러리 설치 없이 빌드할 수 있습니다.

## 새 프로젝트 연결

1. Firebase Console에서 프로젝트를 만들고 웹 앱을 등록합니다.
2. Authentication → Sign-in method에서 **익명(Anonymous)** 로그인을 켭니다.
3. Cloud Firestore 데이터베이스를 **프로덕션 모드**로 만듭니다. Rules 탭에 `firestore.rules` 내용을 붙여 넣고 게시합니다. 또는 Firebase CLI로 `firebase deploy --only firestore:rules --project 실제프로젝트ID`를 실행합니다.
4. 이 폴더를 GitHub 저장소에 올리고 Vercel에서 Import합니다. Framework Preset은 **Other**, Build Command는 `npm run build`, Output Directory는 `dist`입니다. `vercel.json`에도 설정되어 있습니다.
5. Firebase 웹 앱 설정의 `apiKey`, `authDomain`, `projectId`, `appId`를 Vercel 환경 변수 `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_APP_ID`에 넣고 배포합니다. 이 값은 공개 클라이언트 설정이며 서비스 계정 키는 필요하지 않습니다.
6. Firebase Authentication → Settings → Authorized domains에 Vercel 배포 도메인을 추가합니다. 환경 변수를 나중에 바꾸면 Vercel에서 Redeploy합니다.

## 동작

- Firebase 설정이 없으면 `DEMO`로 표시하고 현재 브라우저의 localStorage에만 저장합니다. 데모 기록은 Firebase로 자동 이관되지 않습니다.
- 연결되면 `LIVE`로 표시합니다. 익명 로그인 후 PNG 그림과 닉네임을 Firestore `drawings`에 저장하고 최신 60개를 실시간으로 표시합니다. Firebase Storage는 필요하지 않습니다.
- 연결 오류 시 `OFFLINE`으로 표시하며 저장 실패한 그림은 칠판에 남습니다.
- 그림은 240×240 투명 PNG로 잘라 저장합니다. 친구를 누르는 하트는 화면 효과입니다.
- 새 사이트에 공개 업로드를 허용하는 규칙입니다. 규칙은 작성자를 검사하며 수정과 삭제를 차단합니다. 운영 시 Firebase App Check를 연결하고 Firestore 사용량을 확인할 수 있습니다.

## 로컬

`npm run check`와 `npm run build`를 실행한 다음 `python3 -m http.server 3000 --directory dist`로 엽니다. Firebase를 연결하려면 `.env.example`의 네 가지 변수를 셸 환경에 설정하고 빌드합니다. 빌드 스크립트는 `.env` 파일을 자동으로 읽지 않습니다.

현재 Vercel·Firebase 프로젝트를 생성하거나 실제 배포한 상태는 아닙니다.
