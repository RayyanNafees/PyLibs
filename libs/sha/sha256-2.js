function getHash(str, algo = "SHA-256") {
    let strBuf = new TextEncoder('utf-8').encode(str);
    return crypto.subtle.digest(algo, strBuf)
        .then(hash => {
            window.hash = hash;
            // here hash is an arrayBuffer, 
            // so we'll connvert it to its hex version
            let result = '';
            const view = new DataView(hash);
            for (let i = 0; i < hash.byteLength; i += 4) {
                result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
            }
            return result;
        });
}

getHash('hello world')
    .then(hash => {
        console.log(hash);
    });