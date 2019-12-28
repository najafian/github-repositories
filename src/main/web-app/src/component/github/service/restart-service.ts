export const resetIfNotAthenticated = (props: any) => {
    if (props.authenticationState===undefined || !props.authenticationState.isAuthenticated) {
        props.history.push('/');
    }
};