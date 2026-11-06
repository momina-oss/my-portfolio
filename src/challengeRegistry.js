import { lazy } from 'react'

// Each entry loads the real component from your ui_challenges project (in order 001 to 030).
const loaders = [
  () => import('./challenges/001-signup/SignUp.jsx'),
  () => import('./challenges/002-checkout/Checkout.jsx'),
  () => import('./challenges/003-landing/Landing.jsx'),
  () => import('./challenges/004-calculator/MortgageCalculator.jsx'),
  () => import('./challenges/005-app-icon/AppIcon.jsx'),
  () => import('./challenges/006-profile/Profile.jsx'),
  () => import('./challenges/007-settings/Settings.jsx'),
  () => import('./challenges/008-404/NotFound.jsx'),
  () => import('./challenges/009-music-player/MusicPlayer.jsx'),
  () => import('./challenges/010-social-share/SocialShare.jsx'),
  () => import('./challenges/011-flash-message/FlashMessage.jsx'),
  () => import('./challenges/012-shop/Shop.jsx'),
  () => import('./challenges/013-dm/DirectMessage.jsx'),
  () => import('./challenges/014-countdown/Countdown.jsx'),
  () => import('./challenges/015-switch/SmartPanel.jsx'),
  () => import('./challenges/016-popup/PopupOverlay.jsx'),
  () => import('./challenges/017-receipt/Receipt.jsx'),
  () => import('./challenges/018-analytics/Analytics.jsx'),
  () => import('./challenges/019-leaderboard/Leaderboard.jsx'),
  () => import('./challenges/020-location/LocationTracker.jsx'),
  () => import('./challenges/021-home-dashboard/HomeDashboard.jsx'),
  () => import('./challenges/022-search/HotelSearch.jsx'),
  () => import('./challenges/023-onboarding/Onboarding.jsx'),
  () => import('./challenges/024-boarding-pass/BoardingPass.jsx'),
  () => import('./challenges/025-tv-app/TVApp.jsx'),
  () => import('./challenges/026-subscribe/Subscribe.jsx'),
  () => import('./challenges/027-dropdown/Dropdown.jsx'),
  () => import('./challenges/028-contact/ContactPage.jsx'),
  () => import('./challenges/029-map/TransitMap.jsx'),
  () => import('./challenges/030-pricing/Pricing.jsx'),
]

export const challengeComponents = loaders.map((load) => lazy(load))
