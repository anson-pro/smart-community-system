import request from '@/utils/request';

// 添加房间
const addRoom = data => request({
  url: '/rooms',
  method: 'post',
  data,
});

// 删除房间
const deleteRoomById = id => request({
  url: `/rooms/${id}`,
  method: 'delete',
});

// 更新房间
const updateRoomById = (id, data) => request({
  url: `/rooms/${id}`,
  method: 'patch',
  data,
});

// 获取所有房间
const fetchRooms = params => request.get('/rooms', {
  params,
});

// 获取所有街道
const fetchStreets = params => request.get('/streets', {
  params,
});

// 获取所有物业
const fetchProperties = params => request.get('/properties', {
  params,
});

// 获取小区信息(根据街道及物业)
const fetchCommunities = params => request.get('/communities', {
  params,
});

// 获取单元信息
const fetchUnits = params => request.get('/units', {
  params,
});

// 根据楼 id 获取单元信息
const fetchUnitsByFloorId = id => request.get(`/units?floorId=${id}`);

// 根据小区 id 获取楼信息
const fetchFloorsByCommunityId = id => request.get(`/floors?communityId=${id}`);

// 根据单元 id 获取房间信息
const fetchRoomsByUnitId = id => request.get(`/rooms?unitId=${id}`);

export {
  addRoom,
  deleteRoomById,
  updateRoomById,
  fetchRooms,
  fetchRoomsByUnitId,
  fetchStreets,
  fetchProperties,
  fetchUnits,
  fetchUnitsByFloorId,
  fetchFloorsByCommunityId,
  fetchCommunities,
};
