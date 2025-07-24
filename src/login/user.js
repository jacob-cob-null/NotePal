import { getUserProfile } from "../Firebase/user-collection";
import { spinnerTrigger } from "../dashboard/events/util";

export const userStore = (() => {
    let user = null;

    function setUser(userCredential) {
        const { uid, displayName, email, photoURL } = userCredential;

        const safeUser = {
            uid,
            displayName: displayName || '',
            email: email || '',
            photoURL: (photoURL && photoURL.trim() !== '')
                ? photoURL
                : getDefaultAvatar(displayName || email || 'User')
        };

        user = safeUser;
        sessionStorage.setItem('user', JSON.stringify(safeUser));
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

    function getDefaultAvatar(name = 'User') {
        const hash = Array.from(name).reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        return `https://www.gravatar.com/avatar/${Math.abs(hash).toString(16)}?d=identicon&f=y`;
    }

    return {
        setUser,
        getUser,
        clearUser,
        getDefaultAvatar
    };
})();

function testImageLoad(url) {
    return new Promise((resolve) => {
        if (!url) return resolve(false);

        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        setTimeout(() => resolve(false), 10000);
        img.src = url;
    });
}

async function setProfileImageSafely(profileImg, imageUrl, fallbackName) {
    if (!profileImg) return;

    if (!imageUrl) {
        profileImg.src = userStore.getDefaultAvatar(fallbackName);
        return;
    }

    const canLoad = await testImageLoad(imageUrl);

    if (canLoad) {
        profileImg.src = imageUrl;
        profileImg.onerror = function () {
            this.src = userStore.getDefaultAvatar(fallbackName);
            this.onerror = null;
        };
    } else {
        profileImg.src = userStore.getDefaultAvatar(fallbackName);
    }
}

export async function initUser() {
    const storedUserInfo = userStore.getUser();

    if (!storedUserInfo || !storedUserInfo.uid) {
        setTimeout(() => {
            window.location.href = '../login/login.html';
        }, 1000);
        return;
    }

    const navbarNameElement = document.getElementById('username');
    const profileImg = document.getElementById('profile');

    const userName = storedUserInfo.displayName || storedUserInfo.email || 'NotePal User';
    if (navbarNameElement) {
        navbarNameElement.textContent = `Welcome! ${userName}`;
        navbarNameElement.classList.add('ml-2');
    }

    await setProfileImageSafely(profileImg, storedUserInfo.photoURL, userName);

    if (sessionStorage.getItem('userInitialized')) return;

    spinnerTrigger(true, mainWorkspace);

    try {
        const fullUserProfile = await getUserProfile(storedUserInfo.uid);

        if (fullUserProfile) {
            const updatedUserName = fullUserProfile.displayName || fullUserProfile.email || 'NotePal User';

            if (navbarNameElement) {
                navbarNameElement.textContent = `Welcome! ${updatedUserName}`;
            }

            userStore.setUser({
                uid: storedUserInfo.uid,
                displayName: fullUserProfile.displayName,
                email: fullUserProfile.email,
                photoURL: fullUserProfile.photoURL
            });

            sessionStorage.setItem('userInitialized', 'true');

            const updatedUser = userStore.getUser();
            await setProfileImageSafely(profileImg, updatedUser.photoURL, updatedUserName);

            spinnerTrigger(false, mainWorkspace);
        } else {
            setTimeout(() => {
                window.location.href = '../login/login.html';
            }, 5000);
        }
    } catch (error) {
        setTimeout(() => {
            window.location.href = '../login/login.html';
        }, 5000);
    }
}
