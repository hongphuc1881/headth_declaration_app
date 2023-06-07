import { useState } from 'react';
import Table from './pages/Table';
import Form from './pages/Form';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/table" element={<Table />} />
                    <Route path="/declaration" element={<Form />} />
                    <Route path="/edit/:id" element={<Form />} />
                    <Route path="*" Component={() => <Navigate to="/table" />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
