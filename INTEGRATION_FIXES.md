# Frontend-Backend Integration Fixes

## Issues Found and Fixed

### 1. **Sign Up Form - Account Type Selection**
**Problem:** The `Select` component's `name` attribute doesn't work like native HTML inputs. The value wasn't being captured in FormData.

**Fix:** 
- Added React `useState` hook to manage account type state
- Changed from `name="accountType"` to controlled component with `value={accountType}` and `onValueChange={setAccountType}`
- Now the account type is properly captured and sent to the backend

**Files Changed:**
- `frontend/src/components/pages/SignUp.tsx`

### 2. **Sign In - Password Comparison**
**Problem:** The backend was comparing plain text passwords in the database query, but passwords are stored as bcrypt hashes.

**Fix:**
- Modified `signInUserService` to fetch user by email only
- Updated `signInUser` controller to use `bcrypt.compare()` to verify the password hash
- Added proper validation for missing email/password
- Removed password from response data for security

**Files Changed:**
- `backend/src/models/userModel.js`
- `backend/src/controllers/userController.js`

### 3. **Error Handling in Frontend**
**Problem:** Both SignIn and SignUp forms didn't properly handle error responses from the backend.

**Fix:**
- Updated error handling to parse JSON response first, then check if response is ok
- Display actual error messages from backend instead of generic messages
- Added console logging for debugging
- Improved error messages shown to users

**Files Changed:**
- `frontend/src/components/pages/SignUp.tsx`
- `frontend/src/components/pages/SignIn.tsx`

### 4. **Sign Up Success Flow**
**Problem:** After successful signup, the app tried to redirect to `/home` and store a token that doesn't exist yet.

**Fix:**
- Changed to call `onSignInClick()` callback to navigate user to sign-in page
- Removed localStorage token storage (not implemented in backend yet)
- Show success message before redirecting

**Files Changed:**
- `frontend/src/components/pages/SignUp.tsx`

### 5. **Sign In Success Flow**
**Problem:** Similar token/redirect issue as signup.

**Fix:**
- Store user ID and email in localStorage instead of non-existent token
- Added success alert
- Commented out automatic redirect for now (can be enabled when dashboard is ready)

**Files Changed:**
- `frontend/src/components/pages/SignIn.tsx`

## Testing Instructions

### Test Sign Up Process:

1. **Open the application:** Navigate to http://localhost:3000
2. **Click "Sign Up"** or navigate to the sign-up page
3. **Fill in the form:**
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@example.com
   - Phone: +94 771234567
   - Password: password123
   - Account Type: Select "Donate to causes" (or any option)
   - Check the terms and conditions checkbox

4. **Submit the form**
5. **Expected Result:** 
   - You should see "Account created successfully! Please sign in." alert
   - You should be redirected to the sign-in page
   - Check browser console for success log

6. **Verify in database:**
   ```bash
   docker exec -it postgres-db psql -U alokauser -d alokadb -c "SELECT * FROM users WHERE email='john.doe@example.com';"
   ```
   You should see the user with hashed password and account_type = 'donor'

### Test Sign In Process:

1. **Navigate to Sign In page**
2. **Enter credentials:**
   - Email: john.doe@example.com
   - Password: password123

3. **Submit the form**
4. **Expected Result:**
   - You should see "Login successful!" alert
   - Check browser console for success log with user data
   - Open browser DevTools > Application > Local Storage
   - You should see `userId` and `userEmail` stored

5. **Test with wrong password:**
   - Email: john.doe@example.com
   - Password: wrongpassword
   - Expected: "Invalid email or password" error message

6. **Test with non-existent email:**
   - Email: notexist@example.com
   - Password: anything
   - Expected: "Invalid email or password" error message

### Test Using Postman (Comparison):

**Sign Up:**
```
POST http://localhost:5001/api/user/signup
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phone": "+94 771234568",
  "password": "password123",
  "accountType": "campaigner"
}
```

**Sign In:**
```
POST http://localhost:5001/api/user/signin
Content-Type: application/json

{
  "email": "jane.smith@example.com",
  "password": "password123"
}
```

## Browser Console Debugging

Open the browser console (F12 or Cmd+Option+I) to see detailed logs:

**Sign Up Logs:**
- `Submitting signup with: {firstName, lastName, email, phone, accountType}`
- `Sign up successful: {status, message, data}`

**Sign In Logs:**
- `Attempting sign in for: email`
- `Sign in successful: {status, message, data}`

**Error Logs:**
- Any errors will be logged with full details

## Network Tab Debugging

1. Open DevTools > Network tab
2. Submit a form
3. Look for the API request (signup or signin)
4. Check:
   - Request Headers: Should show `Content-Type: application/json`
   - Request Payload: Should show the correct data structure
   - Response: Should show status code and JSON response
   - Any CORS errors

## Common Issues and Solutions

### Issue: "CORS error"
**Solution:** The backend already has CORS enabled (`app.use(cors())`), but if you still see this, check that:
- Backend is running on port 5001
- Frontend is making requests to `http://localhost:5001`

### Issue: "Network error" or "Failed to fetch"
**Solution:** 
- Ensure Docker containers are running: `docker ps`
- Check backend logs: `docker logs aloka-backend`
- Ensure backend is listening on correct port

### Issue: "Invalid input data" error
**Solution:**
- Check all required fields are filled
- Password must be at least 8 characters
- First name and last name must be at least 2 characters
- Phone must be at least 10 characters
- Email must be valid format

### Issue: Account type not saving correctly
**Solution:** This should be fixed now, but verify:
- Check browser console for the submitted data
- Verify account type is one of: 'donor', 'campaigner', 'both'

## Next Steps / Future Improvements

1. **JWT Token Authentication:**
   - Implement JWT token generation in backend on successful login
   - Store token in localStorage/sessionStorage
   - Add token to API requests for authenticated endpoints
   - Add token expiration and refresh logic

2. **Password Reset:**
   - Add "Forgot Password" functionality
   - Email verification system

3. **Form Validation:**
   - Add client-side validation before API call
   - Show validation errors inline
   - Password strength indicator

4. **Better Success Handling:**
   - Replace alerts with toast notifications
   - Smoother transitions between pages
   - Loading states during API calls

5. **Dashboard Redirect:**
   - Create dashboard page
   - Enable automatic redirect after successful login
   - Protect dashboard routes with authentication

6. **Error Messages:**
   - Better, more user-friendly error messages
   - Field-specific validation errors
