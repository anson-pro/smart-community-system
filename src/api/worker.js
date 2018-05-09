import request from '@/utils/request';

const addWorker = data => request({
  url: '/workers',
  method: 'post',
  data,
});

const deleteWorkerById = id => request({
  url: `/workers/${id}`,
  method: 'delete',
});

const updateWorkerById = (id, data) => request({
  url: `/workers/${id}`,
  method: 'patch',
  data,
});

const fetchWorkers = params => request.get('/workers', {
  params,
});

export {
  addWorker,
  deleteWorkerById,
  updateWorkerById,
  fetchWorkers,
};
