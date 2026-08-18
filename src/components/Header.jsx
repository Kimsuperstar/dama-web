function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        담아
      </div>

      <div className="header__actions">
        <button type="button" className="header__login">
          로그인
        </button>

        <button
          type="button"
          className="header__menu"
          aria-label="메뉴 열기"
        >
          ☰
        </button>
      </div>
    </header>
  )
}

export default Header