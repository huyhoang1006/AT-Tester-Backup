export function getUser(){
    if (localStorage.user){
        return JSON.parse(localStorage.user)
    }
    else return null
}

export function setUser(user){
    if (user !== null){
        localStorage.user = JSON.stringify(user)
    }
    else {
        localStorage.removeItem('user') 
    }
}