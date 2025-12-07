// signup.js - Firebase Signup functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Signup page loaded');
    
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await processSignup();
        });
    }
    
    async function processSignup() {
        const fullName = document.getElementById('fullname').value;
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        console.log('Signup attempt:', email);
        
        // Validation
        if (!fullName || !email || !password || !confirmPassword) {
            alert('Please fill in all fields!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            document.getElementById('password').value = '';
            document.getElementById('confirm-password').value = '';
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }
        
        try {
            // Import Firebase auth functions
            const { createUserWithEmailAndPassword, updateProfile } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js');
            const auth = await getAuthInstance();
            
            // Create user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Signup successful:', user);
            
            // Update profile with display name
            await updateProfile(user, {
                displayName: fullName
            });
            
            // Store user data in sessionStorage for main page
            sessionStorage.setItem('currentUser', JSON.stringify({
                fullName: fullName,
                username: email,
                email: email
            }));
            
            alert('Account created successfully! Redirecting to main page...');
            window.location.href = 'index.html';
            
        } catch (error) {
            console.error('Signup error:', error);
            
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already registered. Please login instead.');
            } else if (error.code === 'auth/invalid-email') {
                alert('Invalid email address.');
            } else if (error.code === 'auth/weak-password') {
                alert('Password is too weak.');
            } else {
                alert('Signup failed: ' + error.message);
            }
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

document.addEventListener('keydown', function (e) {
    // Check if Ctrl + Shift + I is pressed
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault(); // Prevent default action
        alert("Opening DevTools is disabled on this page."); // Optional message
    }
});
