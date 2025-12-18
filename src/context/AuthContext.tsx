import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { validateCredentials } from '../utils/authUtils';
import type { User } from '../utils/authUtils';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Check for existing session on mount
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Failed to parse stored user", error);
                sessionStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (identifier: string, password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const result = validateCredentials(identifier, password);
        if (result.success && result.user) {
            setUser(result.user);
            setIsAuthenticated(true);
            sessionStorage.setItem('user', JSON.stringify(result.user));
        }
        return result;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        sessionStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
