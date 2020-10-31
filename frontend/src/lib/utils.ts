import distanceInWordsToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";
import koLocale from "date-fns/locale/ko";

export const formatDate = (date: string): string => {
  const d = new Date(date);
  const now = Date.now();
  const diff = now - new Date(date).getTime();
  // 5분 미만
  if (diff < 1000 * 60 * 5) {
    return "방금 전";
  }
  // 24시간 미만
  if (diff < 1000 * 60 * 60 * 24) {
    return distanceInWordsToNow(d, { addSuffix: true, locale: koLocale });
  }
  // 36시간 미만
  if (diff < 1000 * 60 * 60 * 36) {
    return "어제";
  }
  // 일주일 미만
  if (diff < 1000 * 60 * 60 * 24 * 7) {
    return distanceInWordsToNow(d, { addSuffix: true, locale: koLocale });
  }
  return format(d, "yyyy.MM.dd HH:mm");
};

export const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};

export const getScrollBottom = () => {
  if (!document.body) return 0;
  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();
  return scrollHeight - innerHeight - scrollTop;
};

// 10000000 -> 10,000,000
export const numberWithCommas = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
