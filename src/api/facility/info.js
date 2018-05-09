import request from '@/utils/request';

const addFacilityInfo = data => request({
  url: '/facilityInfos',
  method: 'post',
  data,
});

const deleteFacilityInfoById = id => request({
  url: `/facilityInfos/${id}`,
  method: 'delete',
});

const updateFacilityInfoById = (id, data) => request({
  url: `/facilityInfos/${id}`,
  method: 'patch',
  data,
});

const fetchFacilityInfos = params => request.get('/facilityInfos', {
  params,
});

export {
  addFacilityInfo,
  deleteFacilityInfoById,
  updateFacilityInfoById,
  fetchFacilityInfos,
};
