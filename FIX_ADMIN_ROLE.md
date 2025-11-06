# Fix Admin Role

## Problem
Your admin user account is registered with role "CITIZEN" instead of "ADMIN".

## Solution Options

### Option 1: Using Firestore Console (Recommended)
1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: `crime-net-12f88`
3. Go to Firestore Database
4. Find the `users` collection
5. Find your admin user document (search by email)
6. Edit the `role` field and change it from `CITIZEN` to `ADMIN`
7. Save the changes
8. Logout and login again

### Option 2: Using Backend API (After backend is running)
Run this curl command (replace YOUR_ADMIN_UID and YOUR_ADMIN_TOKEN):

```bash
curl -X PATCH http://localhost:8080/api/users/YOUR_ADMIN_UID/role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"role": "ADMIN"}'
```

### Option 3: Register a New Admin Account
1. Go to Registration page
2. Fill in the form
3. Select "Administrator" role (should be available now for testing)
4. Complete registration
5. The new account will have ADMIN role

### Option 4: Using Browser Console
1. Login to your admin account
2. Open browser console (F12)
3. Run this code:

```javascript
// Get your Firebase ID token
const auth = getAuth();
const token = await auth.currentUser.getIdToken();
const uid = auth.currentUser.uid;

// Update role
const response = await fetch(`http://localhost:8080/api/users/${uid}/role`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ role: 'ADMIN' })
});

const result = await response.json();
console.log(result);

// Logout and login again
await auth.signOut();
window.location.href = '/login';
```

## After Fixing
1. Logout from the application
2. Clear browser cache (Ctrl+Shift+Delete)
3. Login again
4. You should be redirected to `/admin` dashboard
