class User extends Entity {
    
    constructor() {
        super("/user");
    }
    
    login(nickname, password) {
        let parameters = new URLSearchParams();
        parameters.set("nickname", nickname);
        parameters.set("password", password);
        return new Promise((fullfill, reject) => {
            fetch(this.api + this.endpoint + '/login', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                body: parameters
            }).then(response => {
                if (response.ok) {
                    response.json().then(fullfill, reject);
                } else {
                    reject(response);
                }
            }, reject);
        });
    }
    
}