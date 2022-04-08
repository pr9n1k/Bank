

export const nowDate = (date: Date) => {
    const day = date.getDate().toString();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    return day + '.' + month + '.' + year;
}