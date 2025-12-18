import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MigrationProvider } from './context/MigrationContext';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Layout } from './components/common/Layout';
import { Dashboard } from './components/sections/Dashboard';
import { TransactionalDB } from './components/sections/TransactionalDB';
import { DataWarehouse } from './components/sections/DataWarehouse';
import { BulkFileData } from './components/sections/BulkFileData';
import { LiftAndShift } from './components/sections/LiftAndShift';

function App() {
    return (
        <AuthProvider>
            <MigrationProvider>
                <Routes>
                    {/* Public Route */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected Routes */}
                    <Route path="/" element={
                        <ProtectedRoute />
                    }>
                        <Route element={<Layout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="transactional-db/:id?" element={<TransactionalDB />} />
                            <Route path="data-warehouse/:id?" element={<DataWarehouse />} />
                            <Route path="bulk-file-data/:id?" element={<BulkFileData />} />
                            <Route path="lift-and-shift/:id?" element={<LiftAndShift />} />
                        </Route>
                    </Route>

                    {/* Catch all - redirect to login */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </MigrationProvider>
        </AuthProvider>
    );
}

export default App;
