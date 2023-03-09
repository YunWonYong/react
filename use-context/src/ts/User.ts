enum UserState {
    LOGIN = "login",
    INIT = "init",
    NONE = "none"
};

enum UserGrant {
    SLOTS = "slots",
    BACCARA = "baccara",
    ADMIN = "admin"    
};

enum UserMenuGrant {
    ADMIN = "a",
    VIEWER = "v",
    DEV = "d",
};

export type UserGrantType = {
    [key in UserGrant | string]: UserMenuGrant;
}

export type UserType = {
    email: string,
    name: string,
    grant: UserGrantType,
    state: UserState
};

class User {
    private user: UserType;

    constructor() {
        this.user = {
            email: "",
            name: "",
            grant: {},
            state: UserState.INIT,
        };
    }

    get(): UserType {
        return { ...this.user };
    }

    set(user: UserType) {
        this.user = user;
    }
    
};

export default User;

export {
    UserState,
    UserGrant,
    UserMenuGrant
};