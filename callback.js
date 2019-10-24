/*
0 - Get user in some source
1 - Get address from user in source A
2 - Get phone from user in source B
*/

function getUser(callback) {
    setTimeout( () => {
        return callback (null, {
            id: '1',
            name: 'Gus',
            birthDate: new Date()
        })
    }, 1000)
}

function getPhone(userId, callback) {
    setTimeout( () => {
        return callback(null, {
            phone: '8898-8765',
            ddd: '48'
        })
    } ,2000)
}

function getAddress(userId, callback) {
    setTimeout( ()=> {
        return callback(null, {
            street: 'Nowhere',
            number: '0'
        })
    },2000)
}

getUser(function resolveUser(err, user){
    //On JS: null || '' || 0 = false
    if (err) {
        console.error('There is an error on USER', err)
        return
    }
    getPhone(user.id, function resolvePhone(err1, phone) {
        if (err1) {
            console.error('There is an error on PHONE', err1)
        return
        }
        getAddress(user.id, function resolveAddress(err2, address){
            if (err2) {
                console.error('There is an error on ADDRESS', err2)
            }
    
            console.log(`
            Name: ${user.name}
            Address: ${address.street}, ${address.number}
            Phone: (${phone.ddd}) ${phone.phone}
            `)
        })
    })

})
