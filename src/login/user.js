export const userStore = (() => {
    let user = null; // Private variable to hold the user object

    /**
     * Sets the current user. Stores UID in sessionStorage.
     * @param {object} userCredential - The Firebase User object from auth.currentUser or userCredential.user.
     */
    function setUser(userCredential) {
        user = userCredential; // Assign the full Firebase User object
        sessionStorage.setItem('userUID', userCredential.uid);
    }

    /**
     * @returns {object|null} The user object or null if no user.
     */
    function getUser() {
        if (!user) {
            const uid = sessionStorage.getItem('userUID');
            if (uid) {
                user = { uid };
            }
        }
        return user;
    }

    function clearUser() {
        user = null;
        sessionStorage.removeItem('userUID');
        // sessionStorage.removeItem('userDisplayName'); // Clear any other stored minimal data
    }

    return {
        setUser,
        getUser,
        clearUser
    };
})();