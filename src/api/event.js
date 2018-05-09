import request from '@/utils/request';

const addEvent = data => request({
  url: '/events',
  method: 'post',
  data,
});

const deleteEventById = id => request({
  url: `/events/${id}`,
  method: 'delete',
});

const updateEventById = (id, data) => request({
  url: `/events/${id}`,
  method: 'patch',
  data,
});

const fetchEvents = params => request.get('/events', {
  params,
});

export {
  addEvent,
  deleteEventById,
  updateEventById,
  fetchEvents,
};
