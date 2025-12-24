import { jsonResponse, errorResponse } from '../../utils/responses';

export const onRequestPost = async () => {
  try {
    return jsonResponse({ message: 'Вихід виконано успішно' });
  } catch (err: unknown) {
    return errorResponse(`Помилка при виході: ${err}`, 500);
  }
};
