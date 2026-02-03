from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.crud.user import get_user_by_email, get_user_by_username, create_user
from app.schemas.auth import UserCreate, UserLogin, UserResponse, Token
from app.utils.auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    """새 사용자를 등록합니다."""
    # 이메일 중복 확인
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    # 사용자명 중복 확인
    if get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already taken")

    # 비밀번호 해시화
    password_hash = hash_password(user.password)

    # 사용자 생성
    db_user = create_user(db, user.username, user.email, password_hash)
    return db_user


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    """사용자 로그인 후 JWT 토큰을 발급합니다."""
    # 이메일로 사용자 조회
    db_user = get_user_by_email(db, user.email)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # 비밀번호 검증
    if not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # JWT 토큰 생성
    access_token = create_access_token(data={"sub": str(db_user.id)})
    return Token(access_token=access_token, token_type="bearer")


@router.get("/me", response_model=UserResponse)
def get_me(current_user = Depends(get_current_user)):
    """현재 로그인한 사용자 정보를 반환합니다."""
    return current_user
