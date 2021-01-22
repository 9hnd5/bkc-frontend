import { PublicClientApplication } from '@azure/msal-browser';
var graph = require('@microsoft/microsoft-graph-client');
const config = {
    appId: 'a83d2824-0738-426c-8315-64ba9d192ff6',
    authority: "ccca1e8c-bd95-4bbb-a7d9-83fc5b45b244",
    redirectUri: 'http://localhost:3000',
    // redirectUri: 'https://idcgfvnprts01.greenfeed.com.vn:3001',
    scopes: [
        'user.read',
        'mail.readwrite',
    ]
};
let publicClientApplication = new PublicClientApplication({
    auth: {
        clientId: config.appId,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: config.redirectUri
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
});
export const login = async () => {
    try {
        // Login via popup
        await publicClientApplication.loginPopup(
            {
                scopes: config.scopes,
                prompt: "select_account"
            });
        // After login, get the user's profile
        const user = getUserProfile();
        return user;
    }
    catch (err) {
        console.log("Error while login: ", err);
        return null;
    }

}
export const logout = () => {
    publicClientApplication.logout();
}
export const getAllAccount = async () => {
    const accounts = publicClientApplication.getAllAccounts();
    if (accounts && accounts.length > 0) {
        // Enhance user object with data from Graph
        return accounts;
    }
    console.log("Not have any account");
    return null;
}
export const getAccessToken = async (scopes) => {
    try {
        const accounts = publicClientApplication.getAllAccounts();
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
function isInteractionRequired(error) {
    if (!error.message || error.message.length <= 0) {
        return false;
    }
}
function getAuthenticatedClient(accessToken) {
    // Initialize Graph client
    const client = graph.Client.init({
        // Use the provided access token to authenticate
        // requests
        authProvider: (done) => {
            done(null, accessToken);
        }
    });

    return client;
}
export const getUserDetails = async (accessToken) => {
    const client = getAuthenticatedClient(accessToken);

    const user = await client
        .api('/me')
        .select('mail')
        .get();

    return user;
}
export const getUserProfile = async () => {
    try {
        var accessToken = await getAccessToken(config.scopes);
        if (accessToken) {
            // Get the user's profile from Graph
            var user = await getUserDetails(accessToken);
            return user;
        }
        return null;
    }
    catch (err) {
        console.log("Error when get user profile", err);
        return null;
    }
}