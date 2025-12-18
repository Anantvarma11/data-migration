export interface User {
    id: number;
    username: string;
    email: string;
    displayName: string;
    role: string;
}

interface DemoUser extends User {
    password: string;
}

const demoUsers: DemoUser[] = [
    {
        id: 1,
        username: 'praveen',
        email: 'praveen@company.com',
        password: 'demo123',
        displayName: 'PRAVEEN',
        role: 'admin'
    },
    {
        id: 2,
        username: 'admin',
        email: 'admin@company.com',
        password: 'admin123',
        displayName: 'Admin User',
        role: 'admin'
    },
    {
        id: 3,
        username: 'demo',
        email: 'demo@company.com',
        password: 'demo123',
        displayName: 'Demo User',
        role: 'user'
    }
];

export const validateCredentials = (identifier: string, password: string): { success: boolean; user?: User; error?: string } => {
    const user = demoUsers.find(
        u => (u.email.toLowerCase() === identifier.toLowerCase() ||
            u.username.toLowerCase() === identifier.toLowerCase()) &&
            u.password === password
    );

    if (user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'Invalid username/email or password' };
};
