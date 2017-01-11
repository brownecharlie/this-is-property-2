export default function (value) {
  return value.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
}