import { getUserProfile } from "../Firebase/user-collection";
import { spinnerTrigger } from "../dashboard/events/util";

export const userStore = (() => {
    let user = null; // Private variable

    function setUser(userCredential) {
        user = userCredential;
        sessionStorage.setItem('user', JSON.stringify(userCredential)); //set user object to session storage
    }

    function getUser() {
        if (!user) {
            const raw = sessionStorage.getItem('user');
            if (raw) {
                user = JSON.parse(raw);
            }
        }
        return user;
    }

    function clearUser() {
        user = null;
        sessionStorage.removeItem('user');
    }

    return {
        setUser,
        getUser,
        clearUser
    };
})();


export async function initUser() {
    const storedUserInfo = userStore.getUser();
    console.log("🧠 Loaded from userStore:", storedUserInfo);
    if (!storedUserInfo || !storedUserInfo.uid) {
        console.log("No user info in userStore, redirecting to login.");
        setTimeout(() => {
            window.location.href = '../login/login.html';
        }, 1000);
        return;
    }
    const navbarNameElement = document.getElementById('username');
    if (sessionStorage.getItem('userInitialized')) {
        const userName = storedUserInfo.displayName || storedUserInfo.email || 'NotePal User';
        if (navbarNameElement) {
            navbarNameElement.textContent = `Welcome! ${userName}`;
            navbarNameElement.classList.add('ml-2');
        }
        return;
    }

    spinnerTrigger(true, mainWorkspace);

    try {
        const fullUserProfile = await getUserProfile(storedUserInfo.uid);

        if (fullUserProfile) {
            const userName = fullUserProfile.displayName || fullUserProfile.email || 'NotePal User';

            if (navbarNameElement) {
                navbarNameElement.textContent = `Welcome! ${userName}`;
                navbarNameElement.classList.add('ml-2');
            }
            userStore.setUser({
                uid: storedUserInfo.uid,
                displayName: fullUserProfile.displayName,
                email: fullUserProfile.email
            });
            sessionStorage.setItem('userInitialized', 'true'); //flag that user credentials have been loaded
            spinnerTrigger(false, mainWorkspace);
        } else {
            console.warn(`User ${storedUserInfo.uid} logged in, but no Firestore profile found. Redirecting to login.`);
            setTimeout(() => {
                window.location.href = '../login/login.html';
            }, 5000);
        }
    } catch (error) {
        console.error("Error fetching full user profile:", error);
        setTimeout(() => {
            window.location.href = '../login/login.html';
        }, 5000);
    }
}