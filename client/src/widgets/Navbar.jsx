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
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router";

function Navbar({ user, logout, favoriteCount, localIsFavorite }) {
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
      {!!user && (

        <>
        {user.type === "landlord" && (
            <Button as={Link} to="/landlord" className="me-2">
              Мои объявления
            </Button>
          )}
          {user.type === "locataire" && (
            <Button as={Link} to="/locataire" className="me-2">
              Избранные {favoriteCount > 0 && `(${favoriteCount})`}
            </Button>
          )}
          <Button onClick={logout}>Выйти</Button>
        </>
      )}
    </Nav>
  );
}

export default Navbar;
