import {projectFirestore, projectStorage} from "./config";

const Firebase = {
    getData: (callback, setLoaded = Function()) => {
        projectFirestore
            .orderBy('timestamp', 'asc')
            .onSnapshot(snap => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id});
                });
                callback(documents);
                setLoaded(true);
            });
    },
    addFile: (file, imageSize, setLoaded = Function()) => {
        let fileName = Date.now() + file.name;
        let storageRef = projectStorage.ref(fileName);

        storageRef.put(file).then(async () => {
            const imgSrc = await storageRef.getDownloadURL();
            const timestamp = Date.now();
            projectFirestore.add({
                url: imgSrc,
                timestamp: timestamp,
                width: imageSize.width,
                height: imageSize.height
            }).then(() => {
                setLoaded(true);
            })
        })
    },
    deleteFile: (id, url, setLoaded = Function()) => {
        setTimeout(() => {
            projectFirestore.doc(id).delete().then(() => {
                projectStorage.refFromURL(url).delete().then(() => {
                    setLoaded(true);
                })
            });
        }, 300);//установлена искусственная задержка для воспроизведения анимации выполнения операции

    }

}

export default Firebase;