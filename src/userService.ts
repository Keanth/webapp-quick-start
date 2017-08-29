class UserService {
  getById() {
    return { id: 123, name: 'peter' };
  }
  getAll() {
    return [{ id: 123, name: 'peter' }, { id: 222, name: 'robbert' }];
  }
}

export default new UserService();
