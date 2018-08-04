let userImageUpload = document.getElementById("image").src

const rotateRight = () => callPostData('rotateRight')

const callPostData = (transformation) => {
    postData('/image-rotation/imageTransformation', {userImageUpload: userImageUpload, transformation: transformation})
        .then(data => {
            let newData = data.substring(9)
            console.log(newData)
            reload(newData)
        })
        .catch(error => console.error(error))
}

const postData = (url = ``, data = {}) => {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.error(`Fetch Error =\n`, error))
}

function reload(src) {
    let a = document.getElementById("image")
    a.src = src + "?" + new Date().getTime() // CacheBreaker
}

const rotateRightBtn = document.getElementById('rotateRight')
rotateRightBtn.addEventListener('click', rotateRight)

window.onbeforeunload = () => {
    postData('/image-rotation/delete', {userImageUpload: userImageUpload})
}

