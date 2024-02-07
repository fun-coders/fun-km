import { format as formatDate } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const format = (date: any, formatStr = 'PP') => {
  return formatDate(date, formatStr, {
    locale: zhCN,
  });
};
