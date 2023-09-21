

export function highlightText(text: string, searchText: string) {
    const searchRegex = new RegExp(`\\b${searchText}\\b`, 'gi');
    return text.replace(searchRegex, (match) => `<mark>${match}</mark>`);
};