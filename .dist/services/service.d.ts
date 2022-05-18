export default class UserService {
    createNewUser(user: any): Promise<any>;
    getUserByAttribute(attributes: any): Promise<any>;
    getAllDetails(): Promise<any[] | undefined>;
    deleteById(id: any): Promise<any>;
    updateById(Id: any, data: any): Promise<any>;
}
