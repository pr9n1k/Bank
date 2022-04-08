import Role from "../models/Role.js";


class roleService{
    async get(){
        const role = await Role.find();
        return role;
    }
    async add(title,value){
        const role = await Role.create({title,value});
        return role;
    }
}

export default new roleService();