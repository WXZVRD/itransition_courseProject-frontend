import { createIntl, createIntlCache } from 'react-intl';

const cache = createIntlCache();

const intl = createIntl(
    {
        locale: 'en',
    },
    cache
);

export { intl };
