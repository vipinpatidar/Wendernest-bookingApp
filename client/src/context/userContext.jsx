import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  user: {},
  setUser: () => {},
});

// export

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function getUser() {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/profile`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const { user } = await response.json();
      // console.log(user);
      setUser(user);
      setIsAuth(true);
    }

    if (token) {
      getUser();
    }
  }, []);

  // console.log(user);

  const context = {
    user,
    setUser,
    isAuth,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
