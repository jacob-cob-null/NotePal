export const userStore = (() => {
    let user = null; // Private variable

    /**
     * Sets the current user and stores full user object in sessionStorage.
     * @param {object} userCredential - Must include at least uid, displayName, email.
     */
    function setUser(userCredential) {
        user = userCredential;
        sessionStorage.setItem('user', JSON.stringify(userCredential)); //set user object to session storage
    }

    /**
     * @returns {object|null} The user object or null if none.
     */
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