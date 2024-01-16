const userToken = JSON.parse(localStorage.getItem("userToken") || null);
// const authUser = userToken ? userToken.split('|')[0] : null;
export {userToken};