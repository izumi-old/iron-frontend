class Person {
    constructor(id, firstName, lastName, patronymic, email, phoneNumber, password, passportSeriesAndNumber,
                banned, latestSignInDate, roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.patronymic = patronymic;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.passportSeriesAndNumber = passportSeriesAndNumber;
        this.banned = banned;
        this.latestSignInDate = latestSignInDate;
        this.roles = roles;
    }
}

export default Person;
