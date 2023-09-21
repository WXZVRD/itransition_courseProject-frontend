
export function formatDate(inputDate: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-US', options);
}