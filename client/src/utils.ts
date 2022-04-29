export const storage = {

    getToken: () => {
      if(window.localStorage.getItem("token")){
        return JSON.parse(window.localStorage.getItem("token")!)
      }
},
    setToken: (token: any) =>
      window.localStorage.setItem("token", JSON.stringify(token)),
    clearToken: () => window.localStorage.removeItem("token")
  };
  