# TODO List

## Feature: 로그인/회원가입 시스템

### DB (데이터베이스)
- [ ] User 모델 생성
  - [ ] id (Primary Key)
  - [ ] username (Unique, Not Null)
  - [ ] email (Unique, Not Null)
  - [ ] password_hash (Not Null)
  - [ ] created_at, updated_at (Timestamp)
- [ ] User CRUD 함수 작성
  - [ ] create_user (회원가입용)
  - [ ] get_user_by_email (로그인용)
  - [ ] get_user_by_username (중복 체크용)
  - [ ] get_user_by_id (사용자 정보 조회용)

### BE (백엔드)
- [ ] 인증 관련 의존성 설치
  - [ ] python-jose[cryptography] (JWT)
  - [ ] passlib[bcrypt] (비밀번호 해싱)
  - [ ] python-multipart (폼 데이터)
- [ ] Auth 스키마 정의
  - [ ] UserCreate (회원가입 요청)
  - [ ] UserLogin (로그인 요청)
  - [ ] UserResponse (사용자 정보 응답)
  - [ ] Token (JWT 토큰 응답)
- [ ] 비밀번호 해싱 유틸리티 함수
  - [ ] hash_password (비밀번호 해싱)
  - [ ] verify_password (비밀번호 검증)
- [ ] JWT 토큰 유틸리티 함수
  - [ ] create_access_token (토큰 생성)
  - [ ] verify_token (토큰 검증)
  - [ ] get_current_user (현재 사용자 조회 의존성)
- [ ] Auth 라우터 구현
  - [ ] POST /api/auth/register (회원가입)
  - [ ] POST /api/auth/login (로그인)
  - [ ] GET /api/auth/me (현재 사용자 정보)
  - [ ] POST /api/auth/logout (로그아웃 - 옵션)

### FE (프론트엔드)
- [ ] 인증 관련 타입 정의
  - [ ] User 타입
  - [ ] LoginRequest 타입
  - [ ] RegisterRequest 타입
  - [ ] AuthResponse 타입
- [ ] API 호출 함수
  - [ ] register() - 회원가입 API 호출
  - [ ] login() - 로그인 API 호출
  - [ ] getCurrentUser() - 현재 사용자 정보 조회
  - [ ] logout() - 로그아웃
- [ ] 토큰 관리 유틸리티
  - [ ] saveToken() - 로컬스토리지에 토큰 저장
  - [ ] getToken() - 토큰 가져오기
  - [ ] removeToken() - 토큰 삭제
- [ ] 회원가입 페이지 (/register)
  - [ ] 회원가입 폼 컴포넌트
  - [ ] 입력 유효성 검증
  - [ ] 에러 메시지 표시
  - [ ] 회원가입 성공 시 로그인 페이지로 이동
- [ ] 로그인 페이지 (/login)
  - [ ] 로그인 폼 컴포넌트
  - [ ] 입력 유효성 검증
  - [ ] 에러 메시지 표시
  - [ ] 로그인 성공 시 홈으로 이동
- [ ] 인증 상태 관리
  - [ ] 전역 상태 또는 Context로 사용자 정보 관리
  - [ ] 로그인 여부에 따른 UI 변경
- [ ] 네비게이션 바 업데이트
  - [ ] 로그인/회원가입 버튼 (비로그인 시)
  - [ ] 사용자 정보 및 로그아웃 버튼 (로그인 시)

---

## 작업 순서 (권장)
1. DB 작업 (User 모델 및 CRUD)
2. BE 작업 (Auth API 엔드포인트)
3. FE 작업 (로그인/회원가입 UI 및 연동)
