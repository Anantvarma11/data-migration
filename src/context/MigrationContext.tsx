import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type MigrationType = 'transactional' | 'warehouse' | 'bulk' | 'lift';

export type MigrationStatus = 'draft' | 'in-progress' | 'validating' | 'completed' | 'failed';

export interface MigrationLog {
    timestamp: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

export interface Migration {
    id: string;
    name: string;
    type: MigrationType;
    status: MigrationStatus;
    progress: number;
    currentStep: number;
    logs: MigrationLog[];
    config: Record<string, any>;
    metrics?: Record<string, any>;
}

interface MigrationContextType {
    migrations: Migration[];
    createMigration: (name: string, type: MigrationType) => string;
    updateMigration: (id: string, updates: Partial<Migration>) => void;
    getMigration: (id: string) => Migration | undefined;
    addLog: (id: string, message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

const MigrationContext = createContext<MigrationContextType | null>(null);

export const useMigration = () => {
    const context = useContext(MigrationContext);
    if (!context) {
        throw new Error('useMigration must be used within MigrationProvider');
    }
    return context;
};

export const MigrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [migrations, setMigrations] = useState<Migration[]>([]);

    const createMigration = (name: string, type: MigrationType): string => {
        const id = Math.random().toString(36).substr(2, 9);
        const newMigration: Migration = {
            id,
            name,
            type,
            status: 'draft',
            progress: 0,
            currentStep: 0,
            logs: [{ timestamp: new Date().toISOString(), message: 'Migration initialized', type: 'info' }],
            config: {},
        };
        setMigrations((prev) => [...prev, newMigration]);
        return id;
    };

    const updateMigration = (id: string, updates: Partial<Migration>) => {
        setMigrations((prev) =>
            prev.map((mig) => (mig.id === id ? { ...mig, ...updates } : mig))
        );
    };

    const getMigration = (id: string) => migrations.find((m) => m.id === id);

    const addLog = (id: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
        setMigrations((prev) =>
            prev.map((mig) => {
                if (mig.id === id) {
                    return {
                        ...mig,
                        logs: [...mig.logs, { timestamp: new Date().toISOString(), message, type }],
                    };
                }
                return mig;
            })
        );
    };

    return (
        <MigrationContext.Provider value={{ migrations, createMigration, updateMigration, getMigration, addLog }}>
            {children}
        </MigrationContext.Provider>
    );
};
