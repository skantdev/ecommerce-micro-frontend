import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { MainLayout } from '@/layouts/MainLayout';
import { Loader } from '@/components/Loader';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          
          {/* Micro Frontend Routes (will be added in later steps) */}
          {/* <Route path="/login" element={<AuthMFE />} /> */}
          {/* <Route path="/products" element={<ProductsMFE />} /> */}
          {/* <Route path="/cart" element={<CartMFE />} /> */}
          {/* <Route path="/checkout" element={<CheckoutMFE />} /> */}
          {/* <Route path="/orders" element={<OrdersMFE />} /> */}
          {/* <Route path="/profile" element={<ProfileMFE />} /> */}
          {/* <Route path="/admin" element={<AdminMFE />} /> */}
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
