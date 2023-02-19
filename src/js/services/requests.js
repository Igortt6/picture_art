
//  відправляемо данні на сервер, чекаємо відповіді. Переводимо відповідь у потрібний формат
const postData = async (url) => {
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
}

// запит на сервер, для отримання інформації
const getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

export { postData, getResource };