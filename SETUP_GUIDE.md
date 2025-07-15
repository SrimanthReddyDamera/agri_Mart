# AgriMart E-Commerce Setup Guide

## 🚀 Quick Setup Instructions

### 1. Configure Environment Variables
Edit the `.env.local` file with your actual values:

```bash
# Database - Use your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/agrimart
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/agrimart

# Authentication - Generate a strong secret key
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production

# Razorpay Configuration - Get these from your Razorpay dashboard
RAZORPAY_KEY_ID=your_actual_razorpay_key_id
RAZORPAY_KEY_SECRET=your_actual_razorpay_key_secret

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Node Environment
NODE_ENV=development
```

### 2. Get Your Razorpay Keys
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to **Settings** → **API Keys**
3. Generate new keys or use existing ones
4. Copy the **Key ID** and **Key Secret**
5. Replace the placeholder values in `.env.local`

### 3. Set Up Database
Choose one of these options:

#### Option A: Local MongoDB
```bash
# Install MongoDB locally and start the service
# The default connection string works: mongodb://localhost:27017/agrimart
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI`

### 4. Install Dependencies & Start
```bash
# Install dependencies
pnpm install

# Start the development server
npm run dev
```

## 🔧 Fixes Applied

### ✅ Issues Resolved:
1. **Created missing `.env.local` file** - Authentication now works
2. **Fixed cart checkout navigation** - Now uses Next.js router instead of window.location
3. **Removed duplicate config files** - Eliminated Next.js configuration conflicts
4. **Fixed package dependencies** - Removed deprecated crypto package, fixed date-fns version
5. **Improved authentication flow** - Proper login checks before checkout
6. **Fixed Python file paths** - Now works on Linux/cross-platform

### ✅ Authentication Flow Fixed:
- Login properly stores JWT tokens
- Payment page checks authentication before proceeding
- Proper redirects to login when needed
- Cart checkout verifies user is logged in

### ✅ Payment Flow Fixed:
- Razorpay integration properly configured
- All payment methods supported (UPI, Card, Net Banking, Wallet, COD)
- Order creation works correctly
- Payment verification implemented

## 🧪 Testing the Application

### 1. Test Authentication:
1. Go to `/auth/register` and create an account
2. Go to `/auth/login` and log in
3. Verify user session persists

### 2. Test Shopping Flow:
1. Browse `/products` page
2. Add items to cart
3. Go to `/cart` page
4. Click "Proceed to Payment" (should NOT redirect to login now)

### 3. Test Payment Flow:
1. Fill in shipping address
2. Select payment method
3. For COD: Order should be created immediately
4. For online payments: Razorpay checkout should open

## 🚨 Important Notes

### Razorpay Test Mode:
- Use test keys for development
- Use test payment details during testing
- Switch to live keys only for production

### Database:
- The app will automatically create required collections
- Sample data can be added through the admin panel
- Make sure MongoDB is running before starting the app

### Security:
- Change JWT_SECRET to a strong random string
- Never commit `.env.local` to version control
- Use environment variables for all secrets

## 📞 Troubleshooting

### If payment page still redirects to login:
1. Check browser dev tools → Application → Local Storage
2. Look for "auth-token" - it should exist after login
3. Clear browser cache and try again
4. Check console for authentication errors

### If Razorpay integration fails:
1. Verify your API keys are correct in `.env.local`
2. Check if you're using test or live keys consistently
3. Ensure your Razorpay account is activated

### If database connection fails:
1. Verify MongoDB is running
2. Check connection string format
3. Ensure network connectivity for Atlas

## 🎉 Success Checklist

- [ ] `.env.local` configured with real values
- [ ] MongoDB running and accessible
- [ ] Razorpay keys added and working
- [ ] Application starts without errors (`npm run dev`)
- [ ] Can register and login successfully
- [ ] Can add items to cart
- [ ] Cart → Payment flow works without redirecting to login
- [ ] Payment methods show up correctly
- [ ] Orders are created successfully

Your AgriMart e-commerce application should now be fully functional! 🌾