import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Layout } from './components/common/Layout';
import { Dashboard } from './components/sections/Dashboard';
import { TransactionalDB } from './components/sections/TransactionalDB';
import { DataWarehouse } from './components/sections/DataWarehouse';
import { BulkFileData } from './components/sections/BulkFileData';
import { CDCStreaming } from './components/sections/CDCStreaming';
import { LiftAndShift } from './components/sections/LiftAndShift';

function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes */}
                <Route path="/" element={
                    <ProtectedRoute />
                }>
                    <Route element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="transactional-db" element={<TransactionalDB />} />
                        <Route path="data-warehouse" element={<DataWarehouse />} />
                        <Route path="bulk-file-data" element={<BulkFileData />} />
                        <Route path="cdc-streaming" element={<CDCStreaming />} />
                        <Route path="lift-and-shift" element={<LiftAndShift />} />
                    </Route>
                </Route>

                {/* Catch all - redirect to login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
