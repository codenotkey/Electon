function defaultToString (item) {
    if (item === null) {
        return 'NUll'
    } else if (item === undefined) {
        return 'UNDEFINED'
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`
    }
    return item.toString()
}

class ValuePair {
    constructor (key, value) {
        this.key = key
        this.value = value
    }
    toString () {
        return `[${this.key}:${this.value}]`
    }
}

class  Dictionary {
    constructor ( toStringFn = defaultToString) {
        this.toStringFn = toStringFn
        this.table = {}
    }
    // 判断是否有传入的key
    hasKey (key) {
        return this.table[this.toStringFn(key)] !=null
    }
    // 添加新元素，如果已经存在则会被新值覆盖
    set (key, value ) {
        if ( key != null && value != null){
            const tableKey = this.toStringFn(key)
            this.table[tableKey] = new ValuePair (key, value)
            return true
        }
        return false
    }
    // 传入 key 来删除键值对应的数据
    remove (key) {
        if ( this.hasKey(key)) {
            delete this.table[this.toStringFn(key)]
            return true
        }
        return false
    }
    // 传入 key 来取到对应的数据并返回
    get (key) {
        // if ( this.hasKey(key) ){
        //     return this.table[this.toStringFn(key)]
        // }
        // return undefined
        const valuePair = this.table[this.toStringFn(key)]
        return valuePair == null ? undefined : valuePair.value
    }
    // 清空字典
    clear () {
        this.table = {}
    }
    // 返回字典的长度
    size () {
        return Object.keys(this.table).length
    }
    isEmpty () {
        return this.size() === 0
    }
    keys () {
       return  this.keyValues().map(item => item.key)
    }
    values () {
        return  this.keyValues().map(item => item.value)
    }
    keyValues () {
        const valuePair = []
        for( const  key in this.table ) {
            valuePair.push( this.table[key] )
        }
        return valuePair
        // return Object.values(this.table)
    }
    forEach ( callbackFn) {
        const valuesPairs = this.keyValues()
        for (let index = 0; index < valuesPairs.length; index++) {
            const result = callbackFn(valuesPairs[index].key, valuesPairs[index].value)
            if ( result === true){
                break
            }
        }
    }
    toString () {
        const valuePairs =  this.keyValues()
        let string = `${valuePairs[0].toString()}`
        for (let index = 1; index < array.valuePairs; index++) {
            string = `${string},${valuePairs[i].toString}`
        }
        return string
    }
}

// const dictionary = new Dictionary(); 
// dictionary.set('Gandalf', 'gandalf@email.com'); 
// dictionary.set('John', 'johnsnow@email.com'); 
// dictionary.set('Tyrion', 'tyrion@email.com'); 


// dictionary.forEach((k, v) => { 
//     console.log('forEach: ', `key: ${k}, value: ${v}`); 
//    }); 

class HashTable {
    constructor ( toStrFn = defaultToString){
        this.toStrFn =  toStrFn
        this.table = {}
    }
    loseloseHashCode (key) {
        if ( typeof key === 'number') {
            return key
        }
        const tableKey = this.toStrFn(key)
        // console.log(tableKey)
        let hash = 0
        for (let index = 0; index < tableKey.length; index++) {
            hash += tableKey.charCodeAt(index)
        }
        return hash % 37
    }
    hashCode (key) {
       return this.loseloseHashCode(key)
    }
    put( key, value) {
        // if( key != null && value != null){
        //     const position = this.hashCode(key)
        //     this.table[position] = new ValuePair(key, value)
        //     return true
        // }
        // return false

        //线性探查版
        if( key != null && value != null){
            let hash = this.hashCode(key)
            if ( this.table[hash] == null ){
                this.table[hash] = new ValuePair(key, value)
                return true
            } else {
                let position = hash + 1
                while (this.table[position] != null ){
                    position ++
                }
                this.table[position] = new ValuePair(key, value)
                return true
            }    
        }
        return false
    }

    remove (key) {
        const hash = this.hashCode(key)
        if ( this.table[hash] != null ){
            if ( this.table[hash].key === key){
                delete this.table[hash]
                this.verifyRemovesSideEffect(key, hash)
                return true
            } else {
                let position = hash + 1
                while ( this.table[position] != null && this.table[position].key !== key ){
                    position ++
                }
                if( this.table[position] != null && this.table[position.key === key]){
                    delete this.table[hash]
                    this.verifyRemovesSideEffect(key, position)
                    return true
                }
            }
        }
        return false
        // const hash = this.hashCode(key)
        // let valuePair = this.table[hash]
        // if (valuePair !=null ){
        //     delete this.table[hash]
        //     return true
        // }
        // return false
    }
    verifyRemovesSideEffect (key, removedPosition) {
        const hash = this.hashCode(key)
        let index = removedPosition + 1  // 在被删的地方加一开始
        while ( this.table[index] != null) {
            const posHash = this.hashCode (this.table[index].key)
            if ( posHash <= hash || posHash <= removedPosition ){
                    this.table[removedPosition] = this.table[index]
                    delete this.table[index]
                    removedPosition = index //6 12
            }
            index++
        }
    }
    get (key) {
        const hash = this.hashCode(key)
        const valuePair = this.table[hash]
        if ( valuePair == null) {
            return null
        } else {
             let position = hash
            while (  this.table[position] != null && this.table[position].key !== key  ) {
                position ++
            }
            if ( this.table[position] != null && this.table[position].key === key) {
                return  this.table[position].value
            }
        }
    }
    isEmpty () {
        return Object.keys(this.table).length === 0
    }
    toString () {
        if (this.isEmpty()) {
            return ''
        }
        let keys = Object.keys(this.table)
        let stringObj = `${keys[0]}=>${this.table[keys[0]].toString()} `
        for (let index = 1; index < keys.length; index++) {
            stringObj  = `${stringObj},${keys[index]}=>${this.table[keys[index]].toString()}`
        }
        return stringObj
    }
}

const hash = new HashTable()
hash.put('Ygritte', 'ygritte@email.com'); 
hash.put('Jonathan', 'jonathan@email.com'); 
hash.put('Jamie', 'jamie@email.com'); 
hash.put('Jack', 'jack@email.com'); 
hash.put('Jasmine', 'jasmine@email.com'); 
hash.put('Jake', 'jake@email.com'); 
hash.put('Nathan', 'nathan@email.com'); 
hash.put('Athelstan', 'athelstan@email.com'); 
hash.put('Sue', 'sue@email.com'); 
hash.put('Aethelwulf', 'aethelwulf@email.com'); 
hash.put('Sargeras', 'sargeras@email.com'); 

 console.log(hash.hashCode('aa'));
console.log(hash.get('aa'))

