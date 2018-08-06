let userImageUpload = document.getElementById("image").src

const rotateRight = () => callPostData('rotateRight')
const rotateLeft = () => callPostData('rotateLeft')
const transpose = () => callPostData('transpose')

const callPostData = (transformation) => {
    postData('/image-transformation/transform', {userImageUpload: userImageUpload, transformation: transformation})
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

const rotateLeftBtn = document.getElementById('rotateLeft')
rotateLeftBtn.addEventListener('click', rotateLeft)

const transposeBtn = document.getElementById('transpose')
transposeBtn.addEventListener('click', transpose)

window.onbeforeunload = () => {
    postData('/image-transformation/delete', {userImageUpload: userImageUpload})
}

