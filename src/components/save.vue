<template>
    <pre>

        //dao/BookDao.js v1
        const mogoose=require('mongoose')

        let albumsModel=mogoose.model("albums");
        function addAlbums(albums,callback) {
            albumsModel.create(albums,function (err,newAlbums) {
                console.log(newAlbums);
                console.log(err);
                if(!err) {
                    callback(null, newAlbums)
                }
            })
        }
        module.exports={addAlbums}

    </pre>
</template>

<script>
    export default {
        name: "save"
    }
</script>

<style scoped>

</style>