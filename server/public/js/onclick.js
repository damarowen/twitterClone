

const showModal = (e) => {
    const statusId = e.closest('.post').getAttribute('data-id')
    let data = axios.get('/see_posting', {
        params: {
            ID: statusId
        }
    })
    data.then(async res => {
        await displayPost(res.data, originalPost)
    })


}


const clearModal = (e) => {
    const text = e.closest('#replyModal').querySelector('#replyTextArea')
    text.value = ''
    originalPost.innerHTML = ''
}



const submitReply = (e) => {
    const statusId = e.closest('#replyModal').querySelector('.post').getAttribute('data-id')
    const text = e.closest('#replyModal').querySelector('#replyTextArea')

    let data = axios.post(`/post/${statusId}`, {
        textArea: text.value
    })
    data.then(async res => {
        console.log('from submit', res)
    })
    location.reload();


}


const likeButton = (e) => {
    const statusId = e.closest('.post').getAttribute('data-id')
    const spanLike = e.querySelector('.likeSpan')

    let data = axios.put(`/${statusId}/like`)

    data.then(res => {
        //* data 1 is session user
        const userId = res.data[1]
        const like = res.data[0].rows[0].likes
        spanLike.innerHTML = like.length == 0 ? '' : like.length


        //* check if user already like than passing class
        if (like.includes(userId)) {
            e.classList.add("active");
        } else {
            e.classList.remove("active");
        }
    })

}

const retweetButton = (e) => {
    const statusId = e.closest('.post').getAttribute('data-id')
    const retweetSpan = e.querySelector('.retweetSpan')

    const bodyRetweet = e.closest('.post').querySelector('.postActionContainer')

    let data = axios.post(`/${statusId}/retweet`)
    const body = `<span>
    <i class='fas fa-retweet'></i>
         Retweeted by <a href='/profile/$res.data[1]}'>you</a>    
     </span>`
    data.then(res => {
        //* data 1 is session user
        const userId = res.data[1]
        const retweet = res.data[0].rows[0].retweetby

        retweetSpan.innerHTML = retweet.length == 0 ? '' : retweet.length


        // //* check if user already retweet than passing class
        if (retweet.includes(userId)) {
            e.classList.add("active");
            bodyRetweet.innerHTML = body
        } else {
            e.classList.remove("active");
            bodyRetweet.innerHTML = ''
        }


    })

}