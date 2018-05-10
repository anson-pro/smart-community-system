import request from '@/utils/request';

const addUser = data => request({
  url: '/users',
  method: 'post',
  data,
});

const deleteUserById = id => request({
  url: `/users/${id}`,
  method: 'delete',
});

const updateUserById = (id, data) => request({
  url: `/users/${id}`,
  method: 'patch',
  data,
});

const fetchUsers = params => request.get('/users', {
  params,
});

export {
  addUser,
  deleteUserById,
  updateUserById,
  fetchUsers,
};
