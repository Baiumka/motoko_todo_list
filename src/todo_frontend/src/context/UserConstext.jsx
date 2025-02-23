import React, { createContext, useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "declarations/todo_backend";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //private
  const [identity, setIdentity] = useState(null);
  
  //public
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [myUser, setMyUser] = useState(null);
  const [userActor, setUserActor] = useState(null);
  


  useEffect(() => {//userActor
    const fetchUser = async () => {
        userActor.getUser().then((newUser) => {   
          if (newUser.length === 0) {             
            setIsNewUser(true);
          } else {                            
              setIsNewUser(false);    
              setMyUser(newUser[0]);                
          }
        })
        .catch((error) => {      
          showError(error.message);
        }); 
    };

    if (userActor) {
        fetchUser();
    }
  }, [userActor]);   

  useEffect(async () => {//main
    checkLogin();
  }, []);

  const checkLogin = async () => {        
    const authClient = await AuthClient.create();
    if(authClient)
        {            
            const isAuthenticated = await authClient.isAuthenticated();                
            if (isAuthenticated) {
                setIsLoading(true);
                setIsLogin(true);
                await getActorUser();
            }            
        }  
  };

  const login = async () => {    
    const authClient = await AuthClient.create();
    await authClient.login({
    identityProvider: getIdentityProvider(),
    onSuccess: async () => {        
        setIsLogin(true);  
        setIsLoading(true);
        await getActorUser();
    },
    onError: (err) => console.error("Login failed:", err),
    });
  };

  const getActorUser = async () => {        
    try
    {        
        const authClient = await AuthClient.create(); 
        const newIdentity = authClient.getIdentity();     
        const newActor = createActor(canisterId, {
                          agentOptions: {
                             identity: newIdentity,
                           },
              });                   
        setIdentity(newIdentity);
        setUserActor(newActor);            
    }
    catch (e)
    {
      console.error("Error during getting user: ", e);
    }
  };

  const logout = async () => {
      setUserActor(null);
      setIdentity(null);
      setMyUser(null);
      setIsNewUser(false);
      setIsLogin(false);
      const authClient = await AuthClient.create();   
      await authClient.logout();                
  };

  const register = async (newName) => {
    try
    {      
      userActor.register(newName).then((newUser) => {   
        setIsNewUser(false);    
        setMyUser(newUser);   
      })
      .catch((error) => {      
        showError(error.message);
      });      
      
    }
    catch (e)
    {
      console.error("Register Error:", e);
    }
  }; 


  const getIdentityProvider = () => {
    let idpProvider;
    // Safeguard against server rendering
    if (typeof window !== "undefined") {
      const isLocal = process.env.DFX_NETWORK !== "ic";
      // Safari does not support localhost subdomains
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isLocal && isSafari) {
        idpProvider = `http://localhost:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`;
      } else if (isLocal) {
        idpProvider = `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;
      }
    }
    return idpProvider;
  };

  return (
    <UserContext.Provider value={{myUser, isLogin, isNewUser, userActor, isLoading, setIsLoading, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};
