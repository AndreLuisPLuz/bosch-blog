type LoginAttemptArgs = {
    email: string,
    password: string
};

type LoginToken = {
    jwtToken: string,
};

export { LoginAttemptArgs, LoginToken };