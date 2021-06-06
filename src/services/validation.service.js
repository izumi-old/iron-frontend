import React from "react";
import {isEmail} from "validator";

export const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Это поле является обязательным для ввода
            </div>
        );
    }
};

export const email = value => {
    if (value && !isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Введённый адрес электронной почты некорректен
            </div>
        );
    }
};

export const vFirstName = value => {
    if (value && /[ ]+/.test(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Имя не может быть пустым
            </div>
        );
    }
    if (value && !/^[а-яА-Яa-zA-Z0-9 ]+$/.test(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Имя может содержать только буквы русского / латинского алфавита, цифры и пробел
            </div>
        );
    }
};

export const vLastName = value => {
    if (value && /[ ]+/.test(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Имя не может быть пустой
            </div>
        );
    }
    if (value && !/^[а-яА-Яa-zA-Z0-9 ]+$/.test(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Фамилия может содержать только буквы русского / латинского алфавита, цифры и пробел
            </div>
        );
    }
}

export const vPassportSeriesAndNumber = value => {
    if (value && !/\d{4} \d{6}/.test(value)) {
        return (
            <div className={"alert alert-danger"} role={"alert"}>
                Серия и номер паспорта должны соответствовать формату xxxx xxxxxx, где x - число
            </div>
        );
    }
}

export const vPassword = value => {
    if (value && (value.length < 3 || value.length > 40)) {
        return (
            <div className="alert alert-danger" role="alert">
                Длина пароля должна быть от 3 до 40 символов
            </div>
        );
    }
};
