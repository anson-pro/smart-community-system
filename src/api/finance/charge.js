import request from '@/utils/request';

const addCharge = data => request({
  url: '/charges',
  method: 'post',
  data,
});

const deleteChargeById = id => request({
  url: `/charges/${id}`,
  method: 'delete',
});

const updateChargeById = (id, data) => request({
  url: `/charges/${id}`,
  method: 'patch',
  data,
});

const fetchCharges = params => request.get('/charges', {
  params,
});

export {
  addCharge,
  deleteChargeById,
  updateChargeById,
  fetchCharges,
};
