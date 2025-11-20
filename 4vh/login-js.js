// login.js - Firebase Login functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Login page loaded');
    
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await processLogin();
        });
    }
    
    async function processLogin() {
        const email = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        console.log('Login attempt:', email);
        
        if (!email || !password) {
            alert('Please fill in all fields!');
            return;
        }
        
        try {
            // Import Firebase auth functions
            const { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js');
            const auth = await getAuthInstance();
            
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            console.log('Login successful:', user);
            
            // Store user data in sessionStorage for main page
            sessionStorage.setItem('currentUser', JSON.stringify({
                fullName: user.displayName || user.email,
                username: user.email,
                email: user.email
            }));
            
            alert('Login successful! Redirecting...');
            window.location.href = 'index.html';
            
        } catch (error) {
            console.error('Login error:', error);
            
            if (error.code === 'auth/user-not-found') {
                alert('No account found with this email.');
            } else if (error.code === 'auth/wrong-password') {
                alert('Incorrect password.');
            } else if (error.code === 'auth/invalid-email') {
                alert('Invalid email address.');
            } else {
                alert('Login failed: ' + error.message);
            }
            
            document.getElementById('login-password').value = '';
        }
    }
    
    // Helper function to get auth instance
    async function getAuthInstance() {
        const { getAuth } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js');
        
        // Check if auth is already initialized
        if (window.firebaseAuth) {
            return window.firebaseAuth;
        }
        
        // Initialize Firebase if not already done
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js');
        
        const firebaseConfig = {
            apiKey: "AIzaSyBQ2SC_pNukxUebaG1Cjvo6NQaWHF2sJyI",
            authDomain: "webpage4vh.firebaseapp.com",
            projectId: "webpage4vh",
            storageBucket: "webpage4vh.firebasestorage.app",
            messagingSenderId: "133752318356",
            appId: "1:133752318356:web:a042cfda27efbd02b40781"
        };
        
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        window.firebaseAuth = auth;
        return auth;
    }
});