import React, {createContext, useContext, useState, useEffect} from 'react'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

   const login = (userData) => {
        setUser(userData);
        localStorage.setItem('app_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('app_user');
    };

    useEffect(() => {
        const savedUser = localStorage.getItem('app_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{user, loading, setLoading, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAuth must be used within a UserProvider");
    }
    return context;
};