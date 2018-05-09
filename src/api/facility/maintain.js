import request from '@/utils/request';

const addFacilityMaintain = data => request({
  url: '/maintains',
  method: 'post',
  data,
});

const deleteFacilityMaintainById = id => request({
  url: `/maintains/${id}`,
  method: 'delete',
});

const updateFacilityMaintainById = (id, data) => request({
  url: `/maintains/${id}`,
  method: 'patch',
  data,
});

const fetchFacilityMaintains = params => request.get('/maintains?_expand=facility', {
  params,
});

const fetchMaintainsByFacilityName = id => request.get(`/facilities/${id}?_embed=maintains`);

export {
  addFacilityMaintain,
  deleteFacilityMaintainById,
  updateFacilityMaintainById,
  fetchFacilityMaintains,
  fetchMaintainsByFacilityName,
};
