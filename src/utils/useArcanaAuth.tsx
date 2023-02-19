import { AuthProvider, Logins, UserInfo } from "@arcana/auth";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext<ReturnType<typeof useProvideAuth> | undefined>(undefined);

const ProvideAuth = ({
  children,
  provider,
}: {
  children: ReactNode;
  provider: AuthProvider;
}) => {
  const auth = useProvideAuth(provider);
  return (
    <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
  )
};

const useProvideAuth = (auth: AuthProvider) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [availableLogins, setAvailableLogins] = useState<Logins[]>([]);
  const [user, setUser] = useState<UserInfo>();
  const providerRef = useRef(auth.provider);

  const loginWithSocial = async (p: string) => {
    await auth.init();
    await auth.loginWithSocial(p);
  };

  const loginWithLink = async (email: string) => {
    await auth.init();
    return auth.loginWithLink(email);
  };

  const logout = async () => {
    if (await auth.isLoggedIn()) {
      await auth.logout();
    }
  };

  const connect = async () => {
    return await auth.connect();
  };

  const onConnectHook = async () => {
    setIsLoggedIn(true);
    const info = await auth.getUser();
    setUser(info);
  };

  const onDisconnectHook = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    auth.provider.on("connect", onConnectHook);
    auth.provider.on("disconnect", onDisconnectHook);
    auth.init().then(() => {
      setLoading(false);
      auth.isLoggedIn().then((loggedIn) => {
        if (!loggedIn) {
          auth.getLogins().then((logins) => {
            console.log({ logins });
            setAvailableLogins(logins);
          });
        }
        setIsLoggedIn(loggedIn);
      });
    });
    return () => {
      auth.provider.removeListener("connect", onConnectHook);
      auth.provider.removeListener("disconnect", onDisconnectHook);
    };
  }, []);

  return {
    availableLogins,
    loading,
    loginWithLink,
    loginWithSocial,
    logout,
    provider: providerRef.current,
    isLoggedIn,
    user,
    appId: auth.appId,
    connect,
  };
};

const useArcanaAuth = () => {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error("`useAuth` Hook must be used inside `ProvideAuth`");
  }
  return context;
};

export { useArcanaAuth, ProvideAuth };
