const authToken = JSON.parse(localStorage.getItem("authToken") || null);
// const authUser = authToken ? authToken.split('|')[0] : null;
export {authToken};