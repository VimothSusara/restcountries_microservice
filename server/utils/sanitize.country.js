function sanitize(countries) {
    return countries.map(country => {
        return {
            name: country?.name?.common || 'Unknown',
            currencies: country?.currencies || {},
            capital: country?.capital?.[0] || 'N/A',
            languages: country?.languages || {},
            flag: country?.flag || '',
            flags: country?.flags || { png: '', svg: '' },
            region: country?.region || '',
            subregion: country?.subregion || ''
        };
    });
}

module.exports = sanitize;