/*
0 - Get user in some source
1 - Get address from user in source A
2 - Get phone from user in source B
*/
const util = require ('util')

//this will just works when functions follows callback convention:
// ==> (err, success)
const getAddressAsync = util.promisify(getAddress)

function getUser() {
    //If problem -> reject(ERROR)
    //If success -> resolve
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout( () => {
            return resolve ( {
                id: '1',
                name: 'Gus',
                birthDate: new Date()
            })
        }, 1000)
    })

}

function getPhone(userId) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout( () => {
            return resolve({
                phone: '8898-8765',
                ddd: '48'
            })
        } ,2000)
    }) 
}

function getAddress(userId, callback) {
    setTimeout( ()=> {
        return callback(null, {
            street: 'Nowhere',
            number: '0'
        })
    },2000)
}

const userPromise = getUser()
//to manipulate sucess use .then
//to manipulate error use .catch
userPromise
            .then(function (user) {
                return getPhone(user.id)
                .then(function resolvePhone(phone){
                    return {
                        user: {
                            name: user.name,
                            id: user.id
                        },
                        phone : phone
                    }
                })
            })
            .then(function (result){
                const address = getAddressAsync(result.user.id)
                return address.then(function resolveAddress(resultfinal) {
                    return {
                        user: result.user,
                        phone: result.phone,
                        address: resultfinal
                    }
                })
            })
            .then(function (result) {
                console.log(`
                 Name: ${result.user.name}
                 Address: ${result.address.street}, ${result.address.number}
                 Phone: (${result.phone.ddd}) ${result.phone.phone}
                `)
            })
            .catch(function(err) {
                console.error('Error: ', err)
            })


