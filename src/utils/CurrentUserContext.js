import React from "react";

export const UserContext = React.createContext();

export const currentUser = {
    userId: 1,
    userName: 'Дмитрий',
    userEmail: 'test@yandex.ru'
};