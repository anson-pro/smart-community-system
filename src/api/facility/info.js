import request from '@/utils/request';

const addFacilityInfo = data => request({
  url: '/facilities',
  method: 'post',
  data,
});

const deleteFacilityInfoById = id => request({
  url: `/facilities/${id}`,
  method: 'delete',
});

const updateFacilityInfoById = (id, data) => request({
  url: `/facilities/${id}`,
  method: 'patch',
  data,
});

const fetchFacilityInfos = params => request.get('/facilities', {
  params,
});

export {
  addFacilityInfo,
  deleteFacilityInfoById,
  updateFacilityInfoById,
  fetchFacilityInfos,
};
