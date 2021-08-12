const api = {
    user: new User(),
    team: new Team(),
    game: new Game(),
};
document.addEventListener('DOMContentLoaded', event => {
    let [ unauthenticated, authenticated ] = document.querySelectorAll('main > section');
    (null == sessionStorage.getItem('user') ? authenticated : unauthenticated).style.setProperty('display', 'none');
    document.forms['team-manage'].style.setProperty('display', 'none');
    document.querySelectorAll('body > main > section:last-of-type > aside > a').forEach((element, index) => {
        element.addEventListener('click', [
            event => {
                document.forms['team-manage'].style.setProperty('display', 'none');
                document.forms['game-manage'].style.removeProperty('display');
                api.game.findAll(sessionStorage.getItem('token')).then(games => {
                    let table = document.forms['game-manage'].querySelector('table > tbody');
                    table.innerHTML = '';
                    games.forEach(game => {
                        
                    });
                });
            },
            event => {
                document.forms['game-manage'].style.setProperty('display', 'none');
                document.forms['team-manage'].style.removeProperty('display');
                api.team.findAll(sessionStorage.getItem('token')).then(teams => {
                    let table = document.forms['team-manage'].querySelector('table > tbody');
                    table.innerHTML = '';
                    teams.forEach(team => {
                        let row = table.appendChild(document.createElement('tr'));
                        let id = row.appendChild(document.createElement('td'));
                        let name = row.appendChild(document.createElement('td'));
                        id.textContent = team.id;
                        name.textContent = team.name;
                    });
                });
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
    document.forms['game-manage'].addEventListener('submit', event => {
        event.preventDefault();
        api.game.save({
            
        }, sessionStorage.getItem('token')).then(game => {
            event.target.reset();
        });
    }, false);
    document.forms['team-manage'].addEventListener('submit', event => {
        event.preventDefault();
        api.team.save({
            name: event.target.name.value
        }, sessionStorage.getItem('token')).then(team => {
            event.target.reset();
        });
    }, false);
}, false);