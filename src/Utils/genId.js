
let used = []

export const genId = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = [...Array(4)].map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
    if(used.includes(id)) genId()
    return id
}