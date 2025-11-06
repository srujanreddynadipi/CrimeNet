# Firebase Security Issue - Critical Fix Required

## Problem
Firebase API Key has been exposed in git history and is causing `auth/invalid-api-key` errors on the deployed website.

## Root Cause
1. API key was committed to `.env` file
2. Git history contains the exposed key
3. Firebase has disabled the key due to suspicious activity

## Immediate Action Required

### Step 1: Rotate Firebase API Key
1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project: `crime-net-12f88`
3. Go to **Project Settings** → **Service Accounts**
4. Under "Web API keys":
   - Find the exposed key
   - Delete it or disable it
   - Create a NEW API key

### Step 2: Update Local Environment
1. Copy the NEW API key from Firebase Console
2. Update `.env` file with new credentials:
   ```
   VITE_FIREBASE_API_KEY=<NEW_API_KEY>
   VITE_FIREBASE_AUTH_DOMAIN=crime-net-12f88.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=crime-net-12f88
   VITE_FIREBASE_STORAGE_BUCKET=crime-net-12f88.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=208071745909
   VITE_FIREBASE_APP_ID=1:208071745909:web:1069f21e1e2998b8e8733c
   VITE_FIREBASE_MEASUREMENT_ID=G-GQLMMVXRMS
   ```

### Step 3: Rebuild and Deploy
```bash
npm run build
firebase deploy --only hosting
```

### Step 4: (Optional) Clean Git History
To remove the exposed key from git history (requires force push):
```bash
git rm -r --cached .env
git commit --amend
git push origin main --force
```
⚠️ Only do this if no one else is using the repository

## Prevention - Firebase Security Rules

Add these restrictions in Firebase Console to limit API key usage:

### Application restrictions:
- **HTTP referrer**: `https://crime-net-12f88.web.app`
- **Only allow requests from**: `https://crime-net-12f88.web.app/*`

### API restrictions:
- Allow only: `Firebase Authentication API`, `Cloud Firestore API`, `Cloud Storage`

## Why This Error Happens
- Firebase API keys are PUBLIC by design (they need to be in frontend code)
- But they are restricted by:
  1. **Firebase Security Rules** (database level)
  2. **API Key restrictions** (console level)
  3. **Domain restrictions** (CORS level)
- When exposed, Firebase detects suspicious activity and temporarily disables the key

## Testing After Fix
1. Clear browser cache: `Ctrl+Shift+Delete`
2. Hard refresh deployed site: `https://crime-net-12f88.web.app`
3. Try logging in or loading a page that uses Firebase

## References
- [Firebase API Key Security](https://firebase.google.com/docs/projects/api/library)
- [Firebase Security Rules](https://firebase.google.com/docs/database/security)
- [Protecting API Keys in Client-side Apps](https://cloud.google.com/docs/authentication/api-keys)
