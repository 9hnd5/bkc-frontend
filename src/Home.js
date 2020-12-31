import { PublicClientApplication } from '@azure/msal-browser';
import { useEffect, useState } from 'react';
const config = {
    appId: 'a83d2824-0738-426c-8315-64ba9d192ff6',
    authority: "ccca1e8c-bd95-4bbb-a7d9-83fc5b45b244",
    redirectUri: 'http://localhost:3000',
    scopes: [
        'user.read',
        'mail.readwrite',
    ]
};
export const Home = () => {
    let [isAuthenticated, setIsAuthenticatied] = useState(false);
    let publicClientApplication = new PublicClientApplication({
        auth: {
            clientId: config.appId,
            authority: "https://login.microsoftonline.com/common",
            redirectUri: config.redirectUri
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: true
        }
    });
    useEffect(() => {
        const accounts = publicClientApplication.getAllAccounts();
        console.log('account:', accounts);
        if (accounts && accounts.length > 0) {
            // Enhance user object with data from Graph
            getUserProfile();
        }
    }, []);
    async function login() {
        try {
            // Login via popup
            await publicClientApplication.loginPopup(
                {
                    scopes: config.scopes,
                    prompt: "select_account"
                });

            // After login, get the user's profile
            await getUserProfile();
        }
        catch (err) {
            setError(normalizeError(err));
            setIsAuthenticatied(false);
            setUser("isAuthenticated", isAuthenticated);

        }
    }

    function logout() {
        publicClientApplication.logout();
    }
    async function getAccessToken(scopes) {
        try {
            const accounts = publicClientApplication
                .getAllAccounts();

            if (accounts.length <= 0) throw new Error('login_required');
            // Get the access token silently
            // If the cache contains a non-expired token, function
            // will just return the cached token. Otherwise, it will
            // make a request to the Azure OAuth endpoint to get a token
            var silentResult = await publicClientApplication
                .acquireTokenSilent({
                    scopes: scopes,
                    account: accounts[0]
                });

            return silentResult.accessToken;
        } catch (err) {
            // If a silent request fails, it may be because the user needs
            // to login or grant consent to one or more of the requested scopes
            if (isInteractionRequired(err)) {
                var interactiveResult = await publicClientApplication
                    .acquireTokenPopup({
                        scopes: scopes
                    });

                return interactiveResult.accessToken;
            } else {
                throw err;
            }
        }
    }
    async function getUserProfile() {
        try {
            var accessToken = await getAccessToken(config.scopes);
            if (accessToken) {
                // TEMPORARY: Display the token in the error flash
                setError(normalizeError({ message: "Access token:", debug: accessToken }));
                setIsAuthenticatied(true);
            }
        }
        catch (err) {
            setError(normalizeError(err));
            setIsAuthenticatied(false);
            setUser({});

        }
    }
    function setErrorMessage(message, debug) {
        setError({ message: message, debug: debug })

    }

    function normalizeError(error) {
        var normalizedError = {};
        if (typeof (error) === 'string') {
            var errParts = error.split('|');
            normalizedError = errParts.length > 1 ?
                { message: errParts[1], debug: errParts[0] } :
                { message: error };
        } else {
            normalizedError = {
                message: error.message,
                debug: JSON.stringify(error)
            };
        }
        return normalizedError;
    }
    function isInteractionRequired(error) {
        if (!error.message || error.message.length <= 0) {
            return false;
        }
    }
    return (
        <div>
            <button onClick={login} className="btn btn-success">log in</button>
            <button onClick={logout} className="btn btn-success">log out</button>
        </div>
    );
}