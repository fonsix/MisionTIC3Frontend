const api = {
    user: new User(),
    team: new Team(),
    game: new Game(),
};
document.addEventListener('DOMContentLoaded', event => {
    let [ unauthenticated, authenticated ] = document.querySelectorAll('main > section');
    (null == sessionStorage.getItem('user') ? authenticated : unauthenticated).style.setProperty('display', 'none');
    document.querySelectorAll('body > main > section:last-of-type > aside > a').forEach((element, index) => {
        element.addEventListener('click', [
            event => {
                element.style.setProperty('display', 'none');
            },
            event => {
                element.style.setProperty('display', 'none');
            },
            event => {
                authenticated.style.setProperty('display', 'none');
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('token');
                unauthenticated.style.removeProperty('display');
            }
        ][ index ], false);
    });
    document.forms['user-login'].addEventListener('submit', event => {
        event.preventDefault();
        api.user.login(event.target.nickname.value, event.target.password.value).then(auth => {
            unauthenticated.style.setProperty('display', 'none');
            event.target.reset();
            sessionStorage.setItem('token', auth.token);
            sessionStorage.setItem('user', JSON.stringify(auth.user));
            authenticated.style.removeProperty('display');
        });
    }, false);
    document.forms['user-save'].addEventListener('submit', event => {
        event.preventDefault();
        api.user.save({
            fullname: event.target.fullname.value,
            nickname: event.target.nickname.value,
            email: event.target.email.value,
            password: event.target.password.value
        }).then(auth => {
            unauthenticated.style.setProperty('display', 'none');
            event.target.reset();
            sessionStorage.setItem('token', auth.token);
            sessionStorage.setItem('user', JSON.stringify(auth.user));
            authenticated.style.removeProperty('display');
        });
    }, false);
}, false);