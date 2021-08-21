const changeToUpperCase = str => {
  return str.toUpperCase();
};

const changeToProperCase = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const currencyCode = 'Rp';
const currencyPosition = 'left';
const maxFractionDigits = 2;
const thousandSeparator = '.';

function position(currencyPosition, value) {
  return currencyPosition === 'left'
    ? `${currencyCode}${value}`
    : `${value}${currencyCode}`;
}

const currencyFormatter = value => {
  var string = 'string';
  var result;

  if (
    value === 0 ||
    value === null ||
    value === undefined ||
    value === '0' ||
    typeof value === string
  ) {
    return position(currencyPosition, 0);
  }

  let currencyCheck = currencyCode.replace(/\s/g, '').toLowerCase();
  if (currencyCheck === 'idr' || currencyCheck === 'rp') {
    value = Math.ceil(value);
  }

  const valueSplit = String(value.toFixed(maxFractionDigits)).split(
    `${thousandSeparator}`,
  );
  const firstvalue = valueSplit[0];
  const secondvalue = valueSplit[1];
  const valueReal = String(firstvalue).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    `${thousandSeparator}`,
  );

  if (Number(secondvalue) > 0) {
    result = position(
      currencyPosition,
      `${valueReal}${thousandSeparator}${secondvalue}`,
    );
  } else {
    result = position(currencyPosition, `${valueReal}`);
  }

  return result;
};

const formatDateToDMY = date => {
  const day = date.split(' ')[0].split('-')[2];
  const year = date.split(' ')[0].split('-')[0];
  const monthString = date.split(' ')[0].split('-')[1];
  const monthNumber = parseInt(monthString);
  const monthsList = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const month = monthsList[monthNumber - 1];

  return `${day} ${month} ${year}`;
};

export {
  changeToUpperCase,
  changeToProperCase,
  currencyFormatter,
  formatDateToDMY,
};
