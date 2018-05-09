import request from '@/utils/request';

const addForeign = data => request({
  url: '/foreigners',
  method: 'post',
  data,
});

const deleteForeignById = id => request({
  url: `/foreigners/${id}`,
  method: 'delete',
});

const updateForeignById = (id, data) => request({
  url: `/foreigners/${id}`,
  method: 'patch',
  data,
});

const fetchForeigners = params => request.get('/foreigners', {
  params,
});

export {
  addForeign,
  deleteForeignById,
  updateForeignById,
  fetchForeigners,
};
