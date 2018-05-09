import request from '@/utils/request';

const addExpense = data => request({
  url: '/expenses',
  method: 'post',
  data,
});

const deleteExpenseById = id => request({
  url: `/expenses/${id}`,
  method: 'delete',
});

const updateExpenseById = (id, data) => request({
  url: `/expenses/${id}`,
  method: 'patch',
  data,
});

const fetchExpenses = params => request.get('/expenses', {
  params,
});

export {
  addExpense,
  deleteExpenseById,
  updateExpenseById,
  fetchExpenses,
};
