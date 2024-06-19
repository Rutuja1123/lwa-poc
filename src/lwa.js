const LWAAuthorizeOptions = {
    pkce: true,
    popup: true,
    scope: 'profile',
    scope_data: {
        profile: {
            essential: false,
        },
    },
};

function addSDK(onTimerCompletion) {
    // add login sdk to amazon-root div
    const sdkScript = document.createElement('script');
    sdkScript.type = 'text/javascript';
    sdkScript.async = true;
    sdkScript.id = 'amazon-login-sdk';
    sdkScript.src = 'https://assets.loginwithamazon.com/sdk/na/login1.js';

    document.getElementById('amazon-root')?.appendChild(sdkScript);

    window.onAmazonLoginReady = () => {
        window.amazon.Login.setClientId('amzn1.application-oa2-client.b9bfa72ebbce4766807145912506899d');
    };

    setTimeout(() => {
        onTimerCompletion();
    }, 1000);

    // return () => {
    //     document.getElementById('amazon-root')?.removeChild(sdkScript);
    // };
}

function login() {
    console.log('Preparing for LWA authorization...');

    const options = Object.assign({}, LWAAuthorizeOptions);
    window.amazon.Login.authorize(options, (authResponse) => {
        console.log('Starting LWA authorization...');

        if (authResponse.error) {
            throw new Error(`oauth error: ${authResponse.error}`);
        }

        window.amazon.Login.retrieveToken(authResponse.code, (tokenResponse) => {
            console.log('Starting LWA token retrieval...');

            if (tokenResponse.error) {
                throw new Error(`oauth error: ${tokenResponse.error}`);
            }

            window.amazon.Login.retrieveProfile(tokenResponse.access_token, (profileResponse) => {
                console.log('Starting LWA profile retrieval...');

                if (profileResponse.error) {
                    throw new Error(`Unable to get customer data from profile: ${profileResponse.profile}`);
                }

                // dispatch(
                //     CustomerInfoActions.updateCustomer({
                //         name: profileResponse.profile.Name,
                //         email: profileResponse.profile.PrimaryEmail,
                //     }),
                // );
            });
        });
    });
}

function logout() {
    window.amazon.Login.logout();
}

export { addSDK, login, logout };
