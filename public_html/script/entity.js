class Entity {

    constructor(endpoint) {
        this.api = "http://localhost:8080/MisionTIC3";
        this.endpoint = endpoint;
    }

    
    findAll(token) {
        return new Promise((fullfill, reject) => {
            fetch(this.api + this.endpoint, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                method: "GET",
            }).then(response => {
                if (response.ok) {
                    response.json().then(fullfill, reject);
                } else {
                    reject(response);
                }
             }, reject);
        });
    }

    save(object, token) {
        return new Promise((fullfill, reject) => {
            fetch(this.api + this.endpoint, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(object)
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