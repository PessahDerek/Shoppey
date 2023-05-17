

class DefaultWriteValue {
    used = []
    constructor(){
        let id = this.genId()
        return {indx: id, item: "", count: "", price: 0}
    }

    genId = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let id = [...Array(4)].map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
        if(this.used.includes(id)) this.genId()
        return id
    }
}

export default DefaultWriteValue
