import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { CampaignsPage } from '../pages/CampaignsPage'
import { CampaignDetailPage } from '../pages/CampaignDetailPage'
import { DonatePage } from '../pages/DonatePage'
import { DonorDashboardPage } from '../pages/DonorDashboardPage'
import { CreatorDashboardPage } from '../pages/CreatorDashboardPage'
import { SignInPage } from '../pages/SignInPage'
import { SignUpPage } from '../pages/SignUpPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProtectedRoute } from '../components/common/ProtectedRoute'
import { ROUTES } from '../config/routes'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.CAMPAIGNS} element={<CampaignsPage />} />
        <Route path={ROUTES.CAMPAIGN_DETAIL} element={<CampaignDetailPage />} />
        <Route path={ROUTES.DONATE} element={<DonatePage />} />
        <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        
        {/* Protected Routes */}
        <Route
          path={ROUTES.DONOR_DASHBOARD}
          element={
            <ProtectedRoute>
              <DonorDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.CREATOR_DASHBOARD}
          element={
            <ProtectedRoute>
              <CreatorDashboardPage />
            </ProtectedRoute>
          }
        />
        
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
