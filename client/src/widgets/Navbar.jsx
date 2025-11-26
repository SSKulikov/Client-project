// import React from "react";
// import Nav from "react-bootstrap/Nav";
// import { Link } from "react-router";

// function Navbar({ user, logout }) {
//   return (
//     <>
//       <Nav.Link as={Link} to="/">
//         Главная страница
//       </Nav.Link>
//       {!user && (
//         <>
//           <Nav.Link as={Link} to="/registration">
//             Зарегистрироваться
//           </Nav.Link>
//           <Nav.Link as={Link} to="/login">
//             Войти
//           </Nav.Link>
//         </>
//       )}
//       {!!user && (
//         <>
//           <Nav.Link onClick={logout}>Выйти</Nav.Link>
//         </>
//       )}
//     </>
//   );
// }

// export default Navbar;
import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router";

function Navbar({ user, logout }) {
  return (
    <Nav className="align-items-center" navbarScroll>
      <Nav.Link as={Link} to="/">
        Главная
      </Nav.Link>

      {!user && (
        <>
          <Nav.Link as={Link} to="/registration">
            Регистрация
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Войти
          </Nav.Link>
        </>
      )}

      {user && (
        <>
          <span className="text-light me-3">
            Привет,&nbsp;
            <strong>{user.name}</strong>
          </span>
          <Nav.Link onClick={logout} className="text-warning">
            Выйти
          </Nav.Link>
        </>
      )}
    </Nav>
  );
}

export default Navbar;
