import { format, formatDistance } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return '';
  return format(new Date(date), 'dd/MM/yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return format(new Date(date), 'dd/MM/yyyy HH:mm');
};

export const formatTimeAgo = (date) => {
  if (!date) return '';
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(2)}%`;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}; 